var express = require('express');
var mysql = require('mysql');
var router = express.Router();
const debug = require('debug');

var pool  = mysql.createPool({
  connectionLimit : 10,
  host            : 'localhost',
  user            : 'root',
  password        : 'playautomanage14',
  database        : 'inquirymanage'
});

// 페이징시 사용할 
const pagination = {
  total : "", // 총 개수
  per_page : "", // 얼마나 조회할 것인지 (조회 기준)
  current_page : "", // 현재 클릭 된 페이지
  last_page : "", // 마지막 페이지
  direction : "", // next(다음), prev(이전)
  from : "", // 어디서부터 어디까지 조회한 데이터인지 (from ~ to) / per_page 기준으로 설정됨.
  to : "",
  page_view_arr : []
}

/* GET Articles. */
router.get('/articles', function(req, res, next) {
  
  let response_data = {
    pagination_data : {},
    db_row : {}
  }

  // req.query.total = , // 총 개수
  let per_page = parseInt(req.query.per_page) || null; // 얼마나 조회할 것인지 (조회 기준)
  let current_page = parseInt(req.query.current_page) || null; // 현재 클릭 된 페이지
  let last_page = parseInt(req.query.lastpage) || null; // 마지막 페이지
  // let from = req.query.from || null; // 어디서(몇행)부터 어디(몇행)까지 조회한 데이터인지 (from ~ to) / per_page 기준으로 설정됨.
  // let to = req.query.to || null;
  let page_num = req.query.page_num || null; // 페이지 번호들을 표시 해 줄 배열.
  let first = req.query.first || false; // 처음에 띄울 때는 50개만 가져와서 페이징 처리를 해 준다.

  // if, direction is "next" == 다음
  // else, direction is "prev" == 이전
  let direction = req.query.direction || null;
  let prev_page = parseInt(req.query.prevPage) || null;
  
  // page view array setting.
  // let page_view_arr = [];

  // pagination number input.
  // if (direction == "next") {
  //   for (let i = 0; i < page_num.length(); i++) {
  //     page_view_arr.push(page_num[i] + 5);
  //   }
  //   current_page = page_num[0] // 대화살표 클릭시에는, 페이지번호를 맨 처음으로 세팅
  // }

  // if (direction == "prev") {
  //   for (let i = 0; i < page_num.length(); i++) {
  //     page_view_arr.push(page_num[i] - 5);
  //   }
  //   current_page = page_num[0] // 대화살표 클릭시에는, 페이지번호를 맨 처음으로 세팅      
  // }

  // pagination.page_view_arr = page_view_arr;


  
  // limit clause
  let sql_limit_clause = "";
  
  // list startpoint ~ endpoint
  let offset = null; //startpoint

  // response pagination object setting
  from = offset;
  to = current_page * per_page;
  
  // 맨 처음에는 50개를 가지고 가서 페이지네이션을 진행한다.
  if (first == "true") {
    sql_limit_clause = "LIMIT 0, 50";
  
  } else {
    sql_limit_clause = `LIMIT 0, ${per_page * 5}`;
  }
   
  if (last_page) {
    console.log("last_page??");
    offset = last_page * per_page;
    sql_limit_clause = `LIMIT ${offset}, ${per_page * 5}`;
  
  } else if (prev_page) {
    console.log("prev_page??");
    offset = (prev_page-5) * per_page;
    sql_limit_clause = `LIMIT ${offset}, ${per_page * 5}`;
  }

  let sql = `SELECT * FROM inquiryarticles order by writedate desc ${sql_limit_clause}`; //order by writedate desc 

  console.log("쿼리=", sql);

  pool.getConnection(function(err, connection) {
    if (err) throw err; // 연결이 되지 않으면 에러.    

    // Use the connection
    connection.query(sql, function (error, results, fields) {      
      // And done with the connection.
      connection.release();
  
      // Handle error after the release.
      if (error) throw error;      
      // console.log(results);      

      // console.log("dbrow:",results.length);

      response_data.pagination_data = pagination;
      response_data.db_row = JSON.stringify(results);

      // console.log(response_data);

      res.send(response_data);
    
    })

  })
  
});



/* post Articles. */
router.post('/articles', function(req, res, next) {
  
  let inquiry_type = req.body["inquiry_type"];
  let write_date = req.body["write_date"];
  let inquiry_number = req.body["inquiry_number"];
  let commit_code = req.body["commit_code"];
  let shop_code = req.body["shop_code"];
  let author = req.body["author"];
  let subject = req.body["subject"];
  let description = req.body["description"];
  

  let sql = `INSERT INTO inquiryarticles 
  (
    inquirynumber, 
    shopcode, 
    subject,
    description,
    author,
    writedate,
    hits,
    upvote,
    commitcode,
    inquirytype
  )
  VALUES(
    "${inquiry_number}",
    "${shop_code}",
    "${subject}",
    "${description}",
    "${author}",
    "${write_date}",
    0,
    0,
    "${commit_code}",
    "${inquiry_type}"
  )`;


  console.log("쿼리=", sql);

  pool.getConnection(function(err, connection) {
    if (err) throw err; // 연결이 되지 않으면 에러.    

    // Use the connection
    connection.query(sql, function (error, results, fields) {      
      // And done with the connection.
      connection.release();
  
      // Handle error after the release.
      if (error) throw error;

      console.log(results);
      
      res.send(results);    
    })

  })
  
});



module.exports = router;



