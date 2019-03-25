import {AbstractService} from "../abstract.service";
import {AbstractRequest} from "../abstract.request";

export class ShopCommonService extends AbstractService {
    /**
     * 店铺分页
     */
    shopPaging = (request: AbstractRequest) => {
        this.get(
            '/api/common/shop/paging',
            request
        )
    };

}