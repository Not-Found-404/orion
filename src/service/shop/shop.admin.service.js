import {AbstractRequest} from "../abstract.request";
import {ShopCommonService} from "./shop.common.service";

/**
 * 店铺管理服务
 */
export class ShopAdminService extends ShopCommonService {
    /**
     * 创建店铺
     */
    shopCreate = (request: AbstractRequest) => {
        this.put(
            '/api/admin/shop/create',
            request
        )
    };

    /**
     * 更新店铺
     */
    shopUpdate = (request: AbstractRequest) => {
        this.post(
            '/api/admin/shop/update',
            request
        )
    };
}