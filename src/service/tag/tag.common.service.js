import {AbstractService} from "../abstract.service";
import {AbstractRequest} from "../abstract.request";

export class TagCommonService extends AbstractService {

    /**
     * 获得店铺标签列表
     * @param request
     */
    list = (request: AbstractRequest) => {
        console.log('获得店铺标签列表');
        this.get({
            url: '/api/common/tag/list',
            request: request
        });
    };
}