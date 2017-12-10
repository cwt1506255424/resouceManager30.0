$(function(){
	  $.ajax({
        type:"post",
        url:"url1",
        async:true,

        error:function(XMLHttpRequest, textStatus, errorThrown){
            console.log(errorThrown);
        },
        success:function(str){
            var data=eval('('+str+')');
            console.log(str);
            var xdhtml="<option value=''>请选择学段</option>";
            for(var i=0;i<data.length;i++){
                xdhtml+='<option value="'+data[i].id+'">'+data[i].xueduan+'</option>';
             };
             $('#xueduan').html(xdhtml);
	    }
	  });
	  $("#xueduan").on("change",function(data){
		    console.log(data); 
			var xueduan_option_id = $('#xueduan').find("option:selected").val();

			$.get("url1", {"xueduan": xueduan_option_id},function(str){				  
				  console.log(str);
				  var data = JSON.parse(str);                 
                  var xkhtml="<option value=''>请选择学科</option>";
				  for(var i=0;i<data.length;i++){
                    xkhtml+='<option value="'+data[i].id+'">'+data[i].xueke+'</option>';
                  };				  
                  $('#xueke').html(xkhtml);
				
			  
			 });
	 });
/* 	   $("#xueke").on("change",function(data){
			var xueke_option_id = $('#xueke').find("option:selected").val();
			$.get("url1", {"xueduan": xueduan_option_id,"xueke": xueke_option_id},function(str){
				  var data=eval('('+str+')');
                  console.log(data);
                  var jxnrhtml="<option value=''>请选择教学内容</option>";
				  for(var i=0;i<data.length;i++){
                    jxnrhtml+='<option value="'+data[i].id+'">'+data[i].jxnr+'</option>';
                  };
                 //$('#jxnr').html(jxnrhtml);
				
			 });
	 });  */
	 var jxnr_checked="";
	 $("#u11788").click(function(){
		 layer.open({
             title: '对应教学内容' ,
			 content: '<div id="sb"><input type="radio" checked="checked"/><span>勾股定理</span></div>'
				
			 });
		 jxnr_checked=$("#sb").find("input:radio:checked").siblings().html();
		console.log(jxnr_checked);	 
		$("a.layui-layer-btn0").click(function(){
			
			$("#u11789").find("span").html(jxnr_checked);
			
		})
	 })

	
   /*  var jxnrhtml="";
	$("#u11788").click(function(){
		var xueduan_option_id = $('#xueduan').find("option:selected").val();
		var xueke_option_id = $('#xueke').find("option:selected").val();
		$.get("url1", {"xueduan": xueduan_option_id,"xueke": xueke_option_id},function(str){
			  var data=eval('('+str+')');
			  console.log(data);
			
			  for(var i=0;i<data.length;i++){
				jxnrhtml+= '<div id="'+data[i].id+'"><input type="radio" /><span>'+data[i].jxnr+'</span></div>';
			  };
			 //$('#jxnr').html(jxnrhtml);
			
		 });
		layer.open({
             title: '对应教学内容' ,
			 content: jxnrhtml
				
			 });
	 }); 
         */
	 	

				//跟xueduan去查询对应的xueke的值

		/* 网页刚一打开、先给学段填充数据 */
		// $.get("url1", function(data){
			// var data=eval('('+str+')');
			// var html="";
			// for(var i=0;i<data.length;i++){ 
			  // html+='<option value="'+data[i].xueduan+'"></option>';
			// };
             // $('#xueduan').html(html);
			/* 获取这个对象xueduan
		    给学段进行循环、optin进行信息  <option value="data."></option> */
		// });
		//跟xueduan去查询对应的xueke的值
	/* 	$("#xueduan").on("change",function(data){ */
			//先获取当前option 的vue值，xueduanvlue
		/* 	$.get("url2", {xueduan: xueduanvlue},function(data){ */
			    //根据选择的xueduanvlue查询得的xueke的JSON对象，循环
			    //循环给xueke的optin进行循环天真
	/* 		 });
		});
				// 跟xueduan去查询对应的xueke的值
		/* $("#xueke").on("change",function(data){ */
			//拿到xueduan的optin值和xueke的optin值，再去查询，看是否有对jxneirong内容
		/* 	$.get("url3", {学段: xueduanvlue,学科: xuekevlue},function(data){ */
			     //jxneirong对循环optin进行信息值
	/* 		 });
			 www.xxx.com?jxnr.jsp?xueduan=xueduanvlue&xueke=xuekevlue
		}); */
	
/*         var xueduan='<%=task_org.xueduan %>';
        var xueke = '<%=task_org.xueke %>';
        var jxnr = '<%=task_org.jxnr %>';
        var mypcas = new PCAS("xueduan","xueke", "jxnr");
        layui.use(['form'], function () {
            var form = layui.form;
            mypcas.SetValue(xueduan, xueke, area);
            form.render('select');
            form.on('select(xueduan)', function (data) {
				
                xueduan = data.value;
                mypcas.SetValue(data.value, "", "");
                form.render('select');
            });
            form.on('select(xueke)', function (data) {
				
                xueke = data.value;
                mypcas.SetValue(xueduan, data.value, "");
                form.render('select');
            });
            form.on('select(jxnr)', function (data) {
                mypcas.SetValue(xueduan, xueke, data.value);
                form.render('select');
                $('#org_province_hidden').val(xueduan);
                $('#org_city_hidden').val(xueke);
                $('#org_area_hidden').val(data.value);
            });
        });  */
	
	
	
	
	
	
	
	layui.use([ 'form', 'laypage', 'layer', 'upload' ], function() { // 如果只加载一个模块，可以不填数组。如：layui.use('form')
    var form = layui.form // 获取form模块
    , upload = layui.upload // 获取upload模块
    , laypage = layui.laypage, layer = layui.layer;
		/*
		upload.render({
			url : '/upload/excel',
			ext : 'xls|xlsx',
			title : '请选择Excel文件',
			before : function(input) {
				// 返回的参数item，即为当前的input DOM对象
				console.log('文件上传中');
			},
			success : function(res) {
				layer.msg(res.msg);
			}
       });*/
	   upload.render({
		  elem: '.test',
		  size:1024*100,
		  multiple:true,
		  before: function(obj){ //obj参数包含的信息，跟 choose回调完全一致，可参见上文。
			layer.load(); //上传loading
		  },
		  done: function(res, index, upload){
			var item = this.item;
			console.log(item); // item:视频文件的物理路径
			layer.closeAll('loading'); //关闭loading
		  },
		  error: function(index, upload){
			layer.closeAll('loading'); //关闭loading
		  }
		}); 
		
		upload.render({
		  elem: '.doc',
		  exts:'docx|doc|xlsx|xls|ppt|zip|rar|7z|jpg|png|jif|MP3|OGG|WAV',
		  size:1024*100,
		  multiple:true,
		  before: function(obj){ //obj参数包含的信息，跟 choose回调完全一致，可参见上文。
			layer.load(); //上传loading
		  },
		  done: function(res, index, upload){
			var item = this.item;
			console.log(item); // item:文件的物理路径
			layer.closeAll('loading'); //关闭loading
		  },
		  error: function(index, upload){
			layer.closeAll('loading'); //关闭loading
		  }
		}); 

		//监听特定的自定义事件。你可以把它看作是一个ID选择器
		form.on('submit(queryData)', function(data) {
			each();
			return false;
		});
		
		
		
		
	});
	

	
	
	
/*     $("#u11744").click(function () {

        function fileSelected(userfile) {
            uploadFile(userfile);
        }
        function uploadFile(userfile) {
            var fd = new FormData();
            fd.append("userfile",userfile.files[0]);//文件追到到FormData
            var xhr = new XMLHttpRequest();
            xhr.upload.addEventListener("progress", uploadProgress, false);
            xhr.addEventListener("load", uploadComplete, false);
            xhr.addEventListener("error", uploadFailed, false);
            xhr.addEventListener("abort", uploadCanceled, false);
            xhr.open("POST", "http://localhost:8888");
            xhr.send(fd);
        }

        //图片上传进度
        function uploadProgress(evt) {
            if (evt.lengthComputable) {
                var percentComplete = Math.round(evt.loaded * 100 / evt.total);
                console.log(percentComplete)
            }else {
            }
        }

        //图片上传完成
        function uploadComplete(evt) {
            var json = eval('(' + evt.target.responseText + ')');
            //图片上传完成服务器相应
            console.log(json)
        }

        function uploadFailed(evt) {
            alert("上传失败");
        }

        function uploadCanceled(evt) {
            // alert("已经取消上传");
        }






})
 */


 









    // 资源标签
    // $("#u11800").click(function(){
    //
    //     console.log(1);
    //     var html1=$(this).find("span").html();
    //
    //         if ($("#u11798_input").val() == '') {
    //             $("#u11798_input").val(html1);
    //             //$("#u11798_input").val(html1).children(0).remove();
    //         } else {
    //             if( $("#u11798_input").val()){
    //                 // if( $("#u11798_input:contains(html1)")){
    //                     $("#u11798_input").val($("#u11798_input").val() + "," + html1);
    //                 }else{
    //
    //                     return;
    //                 }
    //             }
    //
    //         }
    // })
    $("#u11800").click(function(){
        console.log(1);
        var html1=$(this).find("span").html();
        if( $("#u11798_input").val()==""){
            $("#u11798_input").val(html1);
            $("#u11800").unbind( "click" );
        }else{
               $("#u11798_input").val($("#u11798_input").val()+","+html1);
               $("#u11800").unbind( "click" );
            }

    })
    $("#u11802").click(function(){
        console.log(1);
        var html2=$(this).find("span").html();
        if( $("#u11798_input").val()==""){
            $("#u11798_input").val(html2);
            $("#u11802").unbind( "click" );
        }else{
            $("#u11798_input").val($("#u11798_input").val()+","+html2);
            $("#u11802").unbind( "click" );
        }

    })
    $("#u11804").click(function(){
        console.log(1);
        var html3=$(this).find("span").html();
        if( $("#u11798_input").val()==""){
            $("#u11798_input").val(html3);
            $("#u11804").unbind( "click" );
        }else{
            $("#u11798_input").val($("#u11798_input").val()+","+html3);
            $("#u11804").unbind( "click" );
        }

    })

    $("#u11806").click(function(){
            console.log(1);
        var html4=$(this).find("span").html();
        if( $("#u11798_input").val()==""){
            $("#u11798_input").val(html4);
            $("#u11806").unbind( "click" );
        }else{
            $("#u11798_input").val($("#u11798_input").val()+","+html4);
            $("#u11806").unbind( "click" );
        }

    })
    $("#u11808").click(function(){
            console.log(1);
        var html5=$(this).find("span").html();
        if( $("#u11798_input").val()==""){
            $("#u11798_input").val(html5);
            $("#u11808").unbind( "click" );
        }else{
            $("#u11798_input").val($("#u11798_input").val()+","+html5);
            $("#u11808").unbind( "click" );
        }

    })
    $("#u11810").click(function(){
            console.log(1);
        var html6=$(this).find("span").html();
        if( $("#u11798_input").val()==""){
            $("#u11798_input").val(html6);
            $("#u11810").unbind( "click" );
        }else{
            $("#u11798_input").val($("#u11798_input").val()+","+html6);
            $("#u11810").unbind( "click" );
        }

    })
    $("#u11821").click(function(){
            console.log(1);
        var html7=$(this).find("span").html();
        if( $("#u11798_input").val()==""){
            $("#u11798_input").val(html7);
            $("#u11821").unbind( "click" );
        }else{
            $("#u11798_input").val($("#u11798_input").val()+","+html7);
            $("#u11821").unbind( "click" );
        }

    })
    $("#u11823").click(function(){
            console.log(1);
        var html8=$(this).find("span").html();
        if( $("#u11798_input").val()==""){
            $("#u11798_input").val(html8);
            $("#u11823").unbind( "click" );
        }else{
            $("#u11798_input").val($("#u11798_input").val()+","+html8);
            $("#u11823").unbind( "click" );
        }

    })
    $("#u11825").click(function(){
            console.log(1);
        var html9=$(this).find("span").html();
        if( $("#u11798_input").val()==""){
            $("#u11798_input").val(html9);
            $("#u11825").unbind( "click" );
        }else{
            $("#u11798_input").val($("#u11798_input").val()+","+html9);
            $("#u11825").unbind( "click" );
        }

    })

    $("#u11770_input").click(function(){
        $("#u11829").find("span").html("上传教学设计");
    })
    $("#u11772_input").click(function(){
        $("#u11829").find("span").html("上传课件");
    })
    $("#u11774_input").click(function(){
        $("#u11829").find("span").html("上传微课，可以包含学习任务单");
    })
    $("#u11776_input").click(function(){
        $("#u11829").find("span").html("上传课堂实录");
    })
    $("#u11778_input").click(function(){
        $("#u11829").find("span").html("上传素材");
    });
    
    
    
    
      let semester=$("#u11784_input").val();
      let  subject=$("#u11785_input").val();
      let resourceType='';
      let arr=['#u11770','#u11772','#u11774','#u11776','#u11778'];
      for(var i in arr){
      	$(this).click(function(){
      		resourceType=$(this).find("span").html();	
      	});
   
      };
     let resourceName= $("#u11815_input").val();
     let rescouceIntroduce=$("#u11747_input").val();
     let rescouceTag=$("#u11798_input").val();
     let copyrightOwner= $("#u11832_input").val(); 
  

      /*         $.get("../php/checkuser.php", {"semester": $("#u11784_input").val(),"subject": $("#u11785_input").val(),"resourceType": resourceType}, function (data) {
               console.log(data);
                if(data=="1") {
                    // 用户名可以进行注册。
                    $('#mobile').html("");
                    $('#oPhoneTips').html("<font color='green'>√</font>");

                }else{
                     $('#mobile').html("");
                     $('#oPhoneTips').html( "<font color='red'>X</font>");
                }
            }) */


    
    
 
})