import moxios from "moxios";
import {getCategoryShortList, getCategory} from "./category"

describe("GET `getCategoryShortList`",()=>{
    beforeEach(()=>{
        moxios.install();
    });
    afterEach(()=>{
        moxios.uninstall();
    })
    test("retrieved with no error",()=>{
        const body = {
            "id": 1,
            "title": "French",
            "description":"",
            "category_posts":[]
        }
        moxios.wait(()=>{
            
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: body
            })
        });
        return getCategoryShortList().then((res)=>{
            expect(res.data).toBe(body)
        })

    });

})

