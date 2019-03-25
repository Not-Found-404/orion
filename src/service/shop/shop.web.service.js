import {AbstractRequest} from "../abstract.request";
import {ShopCommonService} from "./shop.common.service";

/**
 * 店铺web服务
 */
export class ShopWebService extends ShopCommonService {


    /**
     * 店铺详情
     * @param request
     */
    shopGetDetail = (request: AbstractRequest) => {
        console.log('method:{},params:{}', "shopGetDetail", request.params);
        this.post(
            '/api/web/shop/get/detail',
            request
        );
    }
}