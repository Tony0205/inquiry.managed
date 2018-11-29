<template>    
    <section class="mbr-fullscreen" id="header2-i" style="padding-bottom: 10rem;">    
        <div class="container align-center">
                        
            <div class="row justify-content-start">            
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
            </div>
            
            <div class="row justify-content-start">     
                <div class="input-group col-4">                    
                    <label for="exampleFormControlInput1" class="col-form-label float-left font-weight-bold"> 제목</label>                    
                    <input type="text" class="form-control form-control-sm" id="exampleFormControlInput1" placeholder="Shop code">
                </div>
            </div>
            

            <div class="row">
                 <form class="col-12">
                    <div class="form-group">
                        <label for="exampleFormControlInput1" class="col-form-label float-left font-weight-bold"> 제목</label>
                        <input type="text" class="form-control form-control-sm" id="exampleFormControlInput1" placeholder="제목">
                    </div>
                            
                    <div class="form-group">
                        <label for="exampleFormControlTextarea1" class="col-form-label float-left font-weight-bold"> 내용</label>
                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="15"></textarea>
                    </div>
                    
                    <div class="form-group">
                        <button type="submit" class="btn btn-sm btn-outline-primary mg-auto">작성 완료</button>
                        <a href="/inquiryBoardList"><button type="button" class="btn btn-sm btn-outline-primary">취소</button></a>
                    </div>
                </form>                         
            </div>

        </div>        
    </section>
</template>



<<style>    
    .inquiryTable th, .inquiryTable td { border:0.5px solid black; }
    .inquiryTable th {
        text-align:center;
    }
    .mg-auto {
        margin : auto;
    }


</style>
