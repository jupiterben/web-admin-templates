// @ts-ignore
/* eslint-disable */

declare namespace API {
  /** 全局通过表格查询返回结果 */
  type TableListResult<T = any> = {
    list: T;
    pagination?: PaginationResult;
  };

  /** 全局通用表格分页返回数据结构 */
  type PaginationResult = {
    page: number;
    size: number;
    total: number;
  };

  /** 全局通用表格分页请求参数 */
  type PageParams<T = any> = {
    limit?: number;
    page?: number;
  } & {
      [P in keyof T]?: T[P];
    };

  type ErrorResponse = {
    /** 业务约定的错误码 */
    errorCode: string;
    /** 业务上的错误信息 */
    errorMessage?: string;
    /** 业务上的请求是否成功 */
    success?: boolean;
  };
}
declare namespace API {
  type Menu = {
    createTime: Date;
    updateTime: Date;
    id: number;
    parentId: number;
    name: string;
    router: string;
    perms: string;
    /** 当前菜单类型 0: 目录 | 1: 菜单 | 2: 权限 */
    type: 0 | 1 | 2;
    icon: string;
    orderNum: number;
    viewPath: string;
    keepalive: boolean;
    isShow: boolean;
    /** 是否外链 */
    isExt?: boolean;
    /** 外链打开方式
     * 1: 新窗口打开
     * 2: iframe
     */
    openMode?: 1 | 2;
  };

  type PermMenu = {
    menus: Menu[];
    perms: string[];
  };

  type AdminUserInfo = {
    createTime?: Date;
    updateTime?: Date;
    id: number;
    departmentId?: number;
    name: string;
    username?: string;
    password?: string;
    psalt?: string;
    nickName?: string;
    headImg: string;
    loginIp?: string;
    email?: string;
    phone?: string;
    remark?: string;
    status?: number;
    roles?: number[];
    departmentName?: string;
  };


  type LoginParams = {
    captchaId: string;
    password: string;
    username: string;
    verifyCode: string;
  };

  /** 登录成功结果 */
  type LoginResult = {
    token: string;
  };
}

