<template>    
    <section class="mbr-fullscreen" id="header2-i" style="padding-bottom: 7rem;">    
        <div class="container align-center bg-light pd-all">
            <form>
                <div class="form-row">
                    <div class="input-group mb-3 col-4">
                        <div class="input-group-prepend">
                            <label class="input-group-text" for="inputGroupSelect01">문의 유형</label>
                        </div>
                        <select class="custom-select" id="inputGroupSelect01">
                            <option selected>Choose...</option>
                            <option value="25">기능개선</option>
                            <option value="27">유지보수</option>
                            <option value="28">확인요청</option>
                            <option value="13">신규개발</option>
                            <option value="21">커스텀</option>
                        </select>
                    </div>

                    <div class="input-group mb-3 col-3">
                        <div class="input-group-prepend">
                            <label class="input-group-text" for="inputGroupSelect01">작성 날짜</label>
                        </div>

                        <input type="text" id="writeDay" readonly>
                    </div>                    
                </div>
                
                <br>
                <div class="form-row">
                    <div class="form-group col-md-4">
                    <label for="shopCode" class="float-left font-weight-bold">쇼핑몰 코드</label>
                    <input type="text" class="form-control form-control-sm form-control-plaintext" readonly id="shopCode" placeholder=" 쇼핑몰 코드">
                    </div>
                    <div class="form-group col-md-4">
                    <label for="writer" class="float-left font-weight-bold">작성자</label>
                    <input type="text" class="form-control form-control-sm form-control-plaintext" readonly id="writer" placeholder=" 작성자">
                    </div>
                </div>

                <br>
                <div class="form-row">
                    <div class="form-group col-md-8">
                    <label for="subject" class="float-left font-weight-bold">제목</label>
                    <input type="text" class="form-control form-control-sm form-control-plaintext" readonly id="subject" placeholder=" 제목">
                    </div>                    
                </div>
                
                <br>
                
                <div class="form-group">
                    <label for="subject" class="float-left font-weight-bold">내용</label>
                    <textarea class="form-control form-control-plaintext form-control-sm" readonly id="exampleFormControlTextarea1" rows="10" placeholder=" 상세내용"></textarea>
                </div>
                
                <button type="submit" class="btn btn-primary mg-3">글 수정</button>
                <a href="/inquiryBoardList"><button type="button" class="btn btn-danger mg-3">돌아가기</button></a>
            </form>          
        </div>      
    </section>
</template>



<<style>    
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
