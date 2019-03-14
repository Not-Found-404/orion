import {AbstractService} from "../abstract.service";
import {AbstractRequest} from "../abstract.request";

class UserService extends AbstractService {


    /**
     * 用户进行登录
     */
    login = (request: AbstractRequest) => {
        console.log('用户登录' + request.params);
        this.post(
            '/api/common/user/login',
            request
        );
    };

    /**
     * 判断手机号是否存在
     */
    judgeMobilePhone = (request: AbstractRequest) => {
        console.log('判断手机号是否存在');
        this.get(
            '/api/common/user/exist/mobile',
            request
        )
    };

    /**
     * 当前用户信息
     */
    getUserInfo = (request: AbstractRequest) => {
        console.log('获取当前登录用户');
        this.get(
            '/api/common/user/current/user/info',
            request
        )
    };

    paging = (request: AbstractRequest) => {
        console.log('用户分页');
        this.get('/api/admin/user/paging', request);
    };

    /**
     * 发送验证码
     */
    sendSms = (request: AbstractRequest) => {
        console.log('发送验证码');
        this.post(
            '/api/common/user/send/register/verification/sms',
            request
        );
    };

}

export default UserService;