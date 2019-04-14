import {AbstractService} from "../abstract.service";
import {AbstractRequest} from "../abstract.request";

export class CommentCommonService extends AbstractService {
    /**
     * 创建评价
     * @param request 参数
     */
    cteate = (request: AbstractRequest) => {
        console.log('创建评价');
        this.post({
            url: '/api/common/comment/create',
            request: request
        });
    };

    /**
     * 查看评价详情
     * @param request 参数
     */
    getDetail = (request: AbstractRequest) => {
        console.log('查看评价详情');
        this.get({
            url: '/api/common/comment/get',
            request: request
        });
    };

    /**
     * 评价分页
     * @param request 参数
     */
    paging = (request: AbstractRequest) => {
        console.log('评价分页');
        this.get({
            url: '/api/common/comment/paging',
            request: request
        });
    };
}