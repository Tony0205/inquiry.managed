<template>    
    <section class="mbr-fullscreen" id="header2-i" style="padding-bottom: 17rem;">    
        <div class="container align-center">
            <div class="row justify-content-md-center">
                                

                <div id="searchForm" style="width:100%;">
                    <div class="form-inline justify-content-md-center" style="margin-bottom:5%; margin-top:5%;">                        
                        <div class="input-group" style="margin-right:1%">  
                            <select class="form-control-sm form-control" v-model="searchCondition">
                                <option value="inquirynum">문의 번호</option>
                                <option value="shopcode">쇼핑몰 코드</option>
                                <option value="subject">제목</option>
                                <option value="description">본문내용</option>
                                <option value="author">작성자</option>                                
                            </select>
                        </div>  

                        <div class="input-group">                           
                            <input class="form-control" type="text" placeholder="Search Keyword" style="width:500px;" v-model="query">
                        </div>
                        <!-- <button type="button" class="btn btn-primary btn-sm" style="float:left;">검색</button>                    -->
                    </div>
                </div>

                <div style="width:100%">
                    
                </div>

                <div style="width:100%">
                    <div style="float:left;">
                        <div style="float:right;"><h4>Displaying page {{pagination.current_page}}</h4></div>
                        <a href="/inquiryWrite"><button type="button" class="btn btn-sm btn-outline-primary">글쓰기</button></a>                        
                    </div>
                    <div>
                        <select class="form-control-sm form-control" v-model="pagination.per_page" @change="list_per_page()" style="float:right; width:10%;">
                            <option value="10">10</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                            <option value="200">200</option>
                            <option value="500">500</option>
                            <option value="1000">1000</option>
                        </select>
                    </div>
                </div>

                <table class="table table-striped table-hover inquiryTable">
                    <colgroup>
                        <col class="index">
                        <col class="inquiry-number">
                        <col class="shopcode">
                        <col class="subject">
                        <col class="author">
                        <col class="write-date">
                        <col class="hits">
                        <col class="upvote">
                    </colgroup>
                
                    <tr>
                        <th>번호</th>
                        <th>문의 번호</th>
                        <th>쇼핑몰 코드</th>
                        <th>제목</th>
                        <th>작성자</th>
                        <th>날짜</th>
                        <th>조회수</th>
                        <th>추천수 <img src="/assets/open-iconic-master/svg/like.svg" alt="thumbUp" class="icon"></th>
                    </tr>
                
                    <tbody>                
                        <tr v-for="article in articles">
                            <td>{{article.id}}</td>
                            <td>{{article.inquirynumber}}</td>
                            <td>{{article.shopcode}}</td>
                            <td>{{article.subject}}</td>
                            <td>{{article.author}}</td>
                            <td>{{article.writedate | moment("YYYY.MM.DD / A hh:mm")}}</td>
                            <td>{{article.hits}}</td>
                            <td>{{article.upvote}}</td>
                        </tr>            
                    </tbody>
                </table>
                <!-- <pre>
                    {{$data}}
                </pre> -->


                <div class="text-center" style="margin-top:2%;">
                    <div>
                        <ul class="pagination">
                            <li class="page-item"><a class="page-link" @click="getChangePage('prev')" v-show="prev_btn">Prev</a></li>                            
                            <li class="page-item" v-for="(page_num, index) in pagination.page_num"><a class="page-link" @click="page_goto(index)"> {{page_num+1}} </a></li>
                            <li class="page-item"><a class="page-link" @click="getChangePage('next')" v-show="next_btn">Next</a></li>
                        </ul>
                    </div>
                </div>

            </div>
        </div>        
    </section>
</template>



<script>
export default {
  created: function () {
    let article_list = [];
    
    this.$http.get(`api/inquiry/articles?first=true`)
    .then((response) => {
        // console.log(response.data.db_row);
        article_list = JSON.parse(response.data.db_row);
        // console.log(article_list);

        this.articleSplit(article_list);
    })    

  },
  data: function () {
    return {      
        query:'',
        searchCondition:'subject',       
        articles: [],
        articles_arr: [],
        pagination:{
            total : null,
            per_page : 10,                
            current_page : null,
            last_page : null,
            direction : null,
            from : null, // 어디서부터 어디까지 조회한 데이터인지 (from ~ to) / per_page 기준으로 설정됨.
            to : null,
            page_num : [],

        },
        prev_btn : true,
        next_btn : true,        
    }
  },
  methods : {     
        articleSplit : function (article_list) {
            this.articles_arr = _.chunk(article_list, this.pagination.per_page);
            // console.log(this.articles_arr.length);
            let page_num = [];

            for (let i = 0; i < this.articles_arr.length; i++) {
                let page_number = null;
                let last_page = this.pagination.last_page;                
                
                if (last_page) {
                    page_number = i+parseInt(last_page);

                } else{
                    page_number = i;
                }

                page_num.push(page_number);
            }            
            
            this.pagination.last_page = ""; // 초기화

            this.pagination.page_num = page_num;
            this.paginationCheck();
            this.page_goto();
        },

        page_goto : function(page = 0) {            
            this.articles = this.articles_arr[page];
            this.pageViewSetting(page);
        },

        // 화면에 보여지는 페이지 내용 세팅 (내가 선택한 페이지 보여주기)
        pageViewSetting : function(page) {
            this.pagination.current_page = parseInt(page) + 1;
        },

        // next & prev button method
        getChangePage : function (direction) {
            let article_list = [];
            let last_page = null;
            let prevPage = null;

            if (direction == "next") {
                last_page = parseInt(_.last(this.pagination.page_num))+1;
            } else { // if, prev button click
                prevPage = parseInt(_.head(this.pagination.page_num));
            }
            
            console.log("array last_page??", last_page);
            console.log("array prevPage??", prevPage);

            this.$http.get("api/inquiry/articles",{
                params : {
                    direction : direction,
                    lastpage : last_page,
                    per_page : this.pagination.per_page,
                    prevPage : prevPage
                }
            }).then( (response) => {
                article_list = JSON.parse(response.data.db_row);
                this.pagination.last_page = last_page;
                this.articleSplit(article_list);
            })
            
            
        },

        // page_goto : function (page_num) {
        //     let pg_obj = this.pagination; //pagination object
        //     pg_obj.current_page = page_num;            

        //     console.log("page_num : ",page_num)
        //     console.log("pagination : ",this.pagination)
            
        //     this.$http.get("api/inquiry/articles", {
        //         params : this.pagination

        //     }).then(function (response) {
        //         console.log("response:", response.data.db_row); // 여기서부터...
        //         this.articles = JSON.parse(response.data.db_row);
        //         this.pagination = response.data.pagination_data; // pagination 객체 다시 세팅.
                
        //         console.log("articles:", this.articles);                
        //         // this.makePaginationObj(response.data);
        //     });
        // },

        search : function () {
        let searchCondition = this.searchCondition;
        let query = this.query;

            switch (searchCondition) {
                case "inquirynum":
                    return this.articles.filter(function(article) {
                        return article.inquirynumber.includes(query)
                    })        
                    break;
                
                case "shopcode":
                    return this.articles.filter(function(article) {
                        return article.shopcode.includes(query)
                    })        
                    break;

                case "subject":
                    return this.articles.filter(function(article) {
                        return article.subject.includes(query)
                    })        
                    break;

                case "description":
                    return this.articles.filter(function(article) {
                        return article.description.includes(query)
                    })        
                    break;

                case "author":
                    return this.articles.filter(function(article) {
                        return article.author.includes(query)
                    })
                    break;

                default:
                    break;
            }
        
        },

        // getArticles : function(page_url) {
        //     const vm = this;
        //     page_url = page_url || `/api/inquiry/articles`;
            
        //     this.$http.get(page_url)
        //         .then(function (response) {
        //             this.articles = response.data;
        //             vm.makePagination(response.data);
        //         })
        // },

        // makePaginationObj : function(data) {
        //     // response.data 를 사용해 pagination 객체를 세팅한다.
        //     let pagination = {
        //         total : data.total,
        //         per_page : data.per_page,                
        //         current_page : data.current_page,
        //         last_page : data.last_page,
        //         direction : data.direction,
        //         from : data.from, // 어디서부터 어디까지 조회한 데이터인지 (from ~ to) / per_page 기준으로 설정됨.
        //         to : data.to,
        //         page_num : data.page_num
        //     }
        //     this.pagination = pagination;
        //     // Vue.set(vm, 'pagination', pagination)
        // },

        calPagination : function(page_num) {
            let limit = this.per_page; //조회 개수
            let offset = page_num*limit; // 페이지 시작점            
        },

        paginationCheck : function(current_page) { 
            // prev button flag
            if (this.pagination.page_num[0] == 0) {
                this.prev_btn = false;
            } else {
                this.prev_btn = true;
            }


            if (this.pagination.page_num.length%5 == 0) {
                this.next_btn = true;

            } else {
                this.next_btn = false;
            }
            


            // let last_page = parseInt(_.last(this.pagination.page_num));

            // console.log(last_page%4);
            
            // if (last_page%4 == 0) {
            //     if (last_page == currnet_page) {
            //         this.next_btn = false;   
            //     }
            //     this.next_btn = true;
            // }
        },
        list_per_page : function() {
            let article_list = [];        
                    
            this.$http.get(`api/inquiry/articles`,{
                params : {
                    per_page : this.pagination.per_page
                }
            })
            .then((response) => {
                // console.log(response.data.db_row);
                article_list = JSON.parse(response.data.db_row);
                // console.log(article_list);

                this.articleSplit(article_list);
            })

        }

  },

  computed : {
    
  }
  
}
</script>



<style>    
    .inquiryTable th, .inquiryTable td { border:0.5px solid black; }
    .inquiryTable th {
        text-align:center;
    }

    .icon {
        width:20px;
        height:17px;
        margin-bottom:7px;
    }

    .index {
        width:5%;
    }

    .inquiry-number {
        width:10%;
    }

    .shopcode {
        width:10%;
    }
    
    .subject {
        width:30%;
    }

    .author {
        width:10%;
    }

    .write-date {
        width:18%;
    }

    .hits {
        width:8%;
    }

    .upvote {
        width:8%;
    }

</style>
