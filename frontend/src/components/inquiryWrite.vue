<template>    
    <section class="mbr-fullscreen" id="header2-i" style="padding-bottom: 7rem;">    
        <div class="container align-center bg-light pd-all">
            <form>
                <div class="form-row">
                    <div class="input-group mb-3 col-4">
                        <div class="input-group-prepend">
                            <label class="input-group-text" for="inputGroupSelect01">문의 유형</label>
                        </div>
                        <select class="custom-select" id="inquiry_type" v-model="article_data.inquiry_type">
                            <option value="" selected>Choose...</option>
                            <option value="25">기능개선</option>
                            <option value="27">유지보수</option>
                            <option value="28">확인요청</option>
                            <option value="13">신규개발</option>
                            <option value="21">커스텀</option>
                        </select>
                    </div>

                    <div class="input-group mb-3 col-3">
                        <div class="input-group-prepend">
                            <label class="input-group-text" for="inputGroupSelect02">작성 날짜</label>
                        </div>
                        <input type="text" id="write_date" v-model="article_data.write_date" readonly>
                    </div>                    

                </div>

                <br>
                <div class="form-row">
                    <div class="input-group mb-3 col-3">
                        <div class="input-group-prepend">
                            <label class="input-group-text" for="inputGroupSelect03">문의 번호</label>
                        </div>

                        <input type="text" id="inquiry_number" v-model="article_data.inquiry_number">
                    </div>
                    
                    <div class="input-group mb-3 col-3">
                        <div class="input-group-prepend">
                            <label class="input-group-text" for="inputGroupSelect04">커밋 코드</label>
                        </div>

                        <input type="text" id="commit_code" v-model="article_data.commit_code">
                    </div>                    
                </div>
                
                <br>
                <div class="form-row">
                    <div class="form-group col-md-4">
                    <label for="shop_code" class="float-left font-weight-bold">쇼핑몰 코드</label>
                    <input type="text" class="form-control form-control-sm" id="shop_code" v-model="article_data.shop_code" placeholder="쇼핑몰 코드">
                    </div>
                    <div class="form-group col-md-4">
                    <label for="author" class="float-left font-weight-bold">작성자</label>
                    <input type="text" class="form-control form-control-sm" id="author" v-model="article_data.author" placeholder="작성자">
                    </div>
                </div>

                <br>
                <div class="form-row">
                    <div class="form-group col-md-8">
                    <label for="subject" class="float-left font-weight-bold">제목</label>
                    <input type="text" class="form-control form-control-sm" id="subject" v-model="article_data.subject" placeholder="제목">
                    </div>                    
                </div>
                
                <br>
                
                <div class="form-group">
                    <label for="description" class="float-left font-weight-bold">내용</label>
                    <textarea class="form-control form-control-sm" id="description" v-model="article_data.description" rows="10" placeholder="상세내용"></textarea>
                </div>
                
                <button type="submit" class="btn btn-primary mg-3" @click.prevent="putArticle()">작성 완료</button>
                <a href="/inquiryBoardList"><button type="button" class="btn btn-danger mg-3">취소</button></a>
                <!-- <modal name="hello-world">
                    hello, world!
                </modal>         -->
                

            </form>          
            <pre>
                {{$data}}
            </pre>

        </div>
    </section>

</template>

<script>
export default {
  created: function () {
  
  },
  data: function () {
    return {
        article_data : {
            inquiry_type : '',
            write_date : this.$moment().format('YYYY-MM-DD HH:mm:ss'),
            inquiry_number : '',
            commit_code : '',
            shop_code : '',
            author : '',
            subject : '',
            description : ''
        }

    }
  },
  methods: {
        // putArticle : function(name){} 과 같음.
        putArticle : function() {
            
            this.$http.post(`api/inquiry/articles`, this.article_data).then((response) => {
                console.log(response.data);
                let insert_id = response.data.insertId; // 등록된 문의 등록 순번
                
                // insert_id 가 있으면 정상등록 진행된 것.
                // if (insert_id) {
                //     console.log('여기탐?');
                //     this.show();
                // } else {
                //     this.$modal.show('Hello-world');
                // }
                
            }).catch((error) => {
                console.error(error);
            });

        },
        // show : function() {
        //     console.log("show?");
        //     this.$modal.show('Hello-world');
        // }
       
  }
}

</script>



<<style>    
    @import 'vue-js-modal/dist/styles.css';
    .inquiryTable th, .inquiryTable td { border:0.5px solid black; }
    .inquiryTable th {
        text-align:center;
    }
    
    .mg-3 {
        margin : 3px;
    }

    .pd-all {
        padding : 30px;
    }


</style>
