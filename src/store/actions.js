import {GETSELLER,GETSGOODS,GETRATINGS} from "store/mutation_types.js";
import axios from "http/http";
export default {
    //请求商家数据
    async [GETSELLER]({commit,state}){
        //发起请求 当前请求会被mock拦截
        const {code,data} = await axios.get("/api/seller");
        if(code === state.OK){
            commit(GETSELLER,data)
        }
    },
    //请求商品数据
    async [GETSGOODS]({commit,state}){
        const {code,data} = await axios.get("/api/goods");
        if(code === state.OK){
            commit(GETSGOODS,data)
        }
    },
    //请求商品数据
    async [GETRATINGS]({commit,state}){
        const {code,data} = await axios.get("/api/ratings");
        if(code === state.OK){
            commit(GETRATINGS,data)
        }
    }
}