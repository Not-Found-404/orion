import {AbstractService} from "../abstract.service";
import {AbstractRequest} from "../abstract.request";

export class ShopService extends AbstractService {

    /**
     * 创建店铺
     */
    createShop = (request: AbstractRequest) => {
        this.put(
            '/api/admin/shop/create',
            request
        )
    };

    /**
     * 店铺分页
     */
    paging = (request: AbstractRequest) => {
        this.get(
            '/api/common/shop/paging',
            request
        )
    };

    /**
     * 更新店铺
     */
    updateShop = (request: AbstractRequest) => {
        this.post(
            '/api/admin/shop/update',
            request
        )
    };

    getDetail = (request: AbstractRequest) => {
        console.log('用户登录' + request.params);
        this.post(
            '/api/web/shop/get/detail',
            request
        );
    }
}