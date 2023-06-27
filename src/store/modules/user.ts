import { defineStore } from 'pinia';

import type { RouteRecordRaw } from 'vue-router';
import { store } from '@/store';
import { ACCESS_TOKEN_KEY } from '@/enums/cacheEnum';
import { Storage } from '@/utils/Storage';
import { generatorDynamicRouter } from '@/router/generator-router';
import { resetRouter } from '@/router';


//
interface UserState {
  token: string;
  name: string;
  avatar: string;
  // like [ 'sys:user:add', 'sys:user:update' ]
  perms: string[];
  menus: RouteRecordRaw[];
  userInfo: Partial<API.AdminUserInfo>;
}

export const useUserStore = defineStore({
  id: 'user',
  state: (): UserState => ({
    token: Storage.get(ACCESS_TOKEN_KEY, null),
    name: 'amdin',
    avatar: '',
    perms: [],
    menus: [],
    userInfo: {},
  }),
  getters: {
    getToken(): string {
      return this.token;
    },
    getAvatar(): string {
      return this.avatar;
    },
    getName(): string {
      return this.name;
    },
    getPerms(): string[] {
      return this.perms;
    },
  },
  actions: {
    /** 清空token及用户信息 */
    resetToken() {
      this.avatar = this.token = this.name = '';
      this.perms = [];
      this.menus = [];
      this.userInfo = {};
      Storage.clear();
    },
    /** 登录 */
    async login(params) {
      try {
        await login(params);
        return this.afterLogin();
      } catch (error) {
        return Promise.reject(error);
      }
    },
    /** 登录成功之后, 获取用户信息以及生成权限路由 */
    async afterLogin() {
      try {
        // const wsStore = useWsStore();
        const [userInfo, { perms, menus }] = await Promise.all([getInfo(), permmenu()]);
        this.perms = perms;
        this.name = userInfo.name;
        this.avatar = userInfo.headImg;
        this.userInfo = userInfo;
        // 生成路由
        const generatorResult = await generatorDynamicRouter(menus);
        this.menus = generatorResult.menus.filter((item) => !item.meta?.hideInMenu);
        // !wsStore.client && wsStore.initSocket();

        return { menus, perms, userInfo };
      } catch (error) {
        return Promise.reject(error);
        // return this.logout();
      }
    },
    /** 登出 */
    async logout() {
      // const wsStore = useWsStore();
      // wsStore.closeSocket();
      this.resetToken();
      resetRouter();
    },
  },
});

// 在组件setup函数外使用
export function useUserStoreWithOut() {
  return useUserStore(store);
}

export function login(data: API.LoginParams) {
  return { token: "" }
}

export async function getInfo(): Promise<API.AdminUserInfo> {
  return { id: 1, name: "xx", headImg: "xx" }
}

export async function permmenu(): Promise<API.PermMenu> {
  const perms = [];
  const menus = [];
  return { perms, menus }
}