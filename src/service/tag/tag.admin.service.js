import {TagCommonService} from "./tag.common.service";
import {AbstractRequest} from "../abstract.request";

export class TagAdminService extends TagCommonService {
    /**
     * 创建店铺标签
     * @param request 参数
     */
    create = (request) => {
        console.log('创建店铺标签');
        this.get({
            url: '/api/admin/tag/create',
            request: request
        });
    };

    /**
     * 更新店铺标签
     * @param request 参数
     */
    update = (request) => {
        console.log('更新店铺标签');
        this.get({
            url: '/api/admin/tag/update',
            request: request
        });
    };
}