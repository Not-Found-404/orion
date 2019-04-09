import UserCommonService from "./user.common.service";
import {AbstractRequest} from "../abstract.request";

/**
 * 用户admin服务
 */
export class UserAdminService extends UserCommonService {
    /**
     * 用户分页
     * @param request 参数
     */
    paging = (request: AbstractRequest) => {
        console.log('用户分页');
        this.get({
            url: '/api/admin/user/paging',
            request: request
        });
    };

    /**
     * 用户禁用启用
     * @param request
     */
    updateStatus = (request: AbstractRequest) => {
        console.log('用户禁用、启用');
        this.put({
            url: '/api/admin/user/update/status',
            request: request
        });
    };
};