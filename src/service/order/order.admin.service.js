import {OrderCommonService} from "./order.common.service";
import {AbstractRequest} from "../abstract.request";

export class OrderAdminService extends OrderCommonService {
    orderUpdate = (request: AbstractRequest) => {
        console.log('商家订单级更新');
        this.get({
            url: '/api/admin/order/update',
            request: request
        });
    };

    /**
     * 订单分页
     * @param request 参数
     */
    paging = (request: AbstractRequest) => {
        console.log('订单分页');
        this.get({
            url: '/api/admin/order/paging',
            request: request
        });
    };
}