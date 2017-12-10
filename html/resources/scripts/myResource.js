$(document).ready(function() {
    //getMyResourceManagePageInfo();
    // toPage();
    // $.ajax({
    //     type: "get",
    //     url: "http://192.168.0.104:8080/teachingContent/findSection",
    //     //async: true,
    //     crossDomain:true,
    //     // error: function(XMLHttpRequest, textStatus, errorThrown) {
    //     //     console.log(errorThrown);
    //     // },
    //     success: function(result) {
    //         console.log(result)
    //         console.log("======")
    //         if (result.isSuccess == 1) {
    //             var data = eval('(' + result + ')');
    //             console.log(result);
    //             var xdhtml = "<option value=''>学段</option>";
    //             for (var i = 0; i < data.length; i++) {
    //                 xdhtml += '<option value="' + data[i].sectionCode + '">' + data[i].sectionName + '</option>';
    //             };
    //             $('#xueduan').html(xdhtml);
    //         } else if (result.isSuccess == 0) {
    //             console.log("查找学段失败");
    //         }
    //     }
    // });
    getMyResourceJxnr();
    getResourceType();
    getStartTime();
    getEndTime();
    $("#selectButton").on('click', function() {
        search();
        toPage();
    })
    $(".edit").on('click', function() {
        var _this = this;
        console.log(this);
        edit(_this);
    })
    $(".delete").on('click', function() {
        var that = this;
        console.log(that);
        Delete(that);
    })
    $(".download").on('click', function() {
        var that1 = this;
        console.log(that1);
        Download(that1);
    })
    $(".share").on('click', function() {
        var that2 = this;
        console.log(that2);
        if ($(that2).html("分享")) {
            Share(that2);
            $(that2).click(function() {
                CancelShare(that2);
            })
        } else if ($(that2).html("取消分享")) {
            CancelShare(that2);
            $(that2).click(function() {
                Share(that2);
            })
        }
    })
});

function getMyResourceJxnr() {
    $.ajax({
        type: "get",
        url: "http://192.168.0.104:8080/teachingContent/findSection",
        async: true,
        // error: function(XMLHttpRequest, textStatus, errorThrown) {
        //     console.log(errorThrown);
        // },
        crossDomain: true,
        success: function(result) {
            if (result.isSuccess == 1) {
                //var data = eval('(' + result + ')');
                // var data=JSON.parse(result);
                // console.log(result);
                var xdhtml = "<option value=''>学段</option>";
                for (var i = 0; i < result.data.length; i++) {
                    // xdhtml += '<option value="' + result.data[i].sectionCode + '">' + result.data[i].sectionName + '</option>';
                    xdhtml += '<option  sectionId="' + result.data[i].sectionId + ' " sectionCode="' + result.data[i].sectionCode + '>' + result.data[i].sectionName + '</option>';
                };
                $('#xueduan').html(xdhtml);
            } else if (result.isSuccess == 0) {
                console.log("查找学段失败");
            }
        }
    });

    $("#xueduan").on("change", function(data) {
        getMyResourceManagePageInfo();
        toPage();
        console.log(data);
        var sectionId_selected = $('#xueduan').find("option:selected").attr("sectionId");
        $.ajax({
            type: "get",
            url: "http://192.168.0.104;8080/teachingContent/findSubjectBySectionId",
            async: true,
            // error: function(XMLHttpRequest, textStatus, errorThrown) {
            //     console.log(errorThrown);
            // },
            data: { "sectionId": sectionId_selected },
            success: function(result) {
                if (result.isSuccess == 1) {
                    //var data = eval('(' + result + ')');
                    //console.log(result);
                    var xkhtml = "<option value=''>学科</option>";
                    for (var i = 0; i < result.data.length; i++) {
                        //xkhtml += '<option value="' + data[i].subjectCode + '">' + data[i].subjectName + '</option>';
                        xkhtml += '<option  subjectId="' + result.data[i].subjectId + ' " subjectCode="' + result.data[i].subjectCode + '>' + result.data[i].subjectName + '</option>';
                    };
                    $('#xueke').html(xkhtml);
                } else if (result.isSuccess == 0) {
                    console.log("查找学科失败");
                }
            }
        });
    });


    $("#xueke").on("change", function() {
            getMyResourceManagePageInfo();
            toPage();
        })
        // var jxnr_checked = "";
        // $("#jxnr").click(function() {
        //     var jxnr_content = "";
        //     var section_option_name = $('#xueduan').find("option:selected").val();
        //     var subject_option_name = $('#xueke').find("option:selected").val();
        //     $.ajax({
        //         type: "get",
        //         url: "http://192.168.0.104:8080/teachingContent/findSubjectSection",
        //         async: true,
        //         // error: function(XMLHttpRequest, textStatus, errorThrown) {
        //         //     console.log(errorThrown);
        //         // },
        //          crossDomain:true,
        //         data: { "sectionName": section_option_name, "subjectName": subject_option_name },
        //         success: function(result) {
        //             if (result.isSuccess == 1) {
        //                 var data = eval('(' + result + ')');
        //                 console.log(result);
        //                 var jxnrhtml = "";
        //                 for (var i = 0; i < data.length; i++) {
        //                     jxnrhtml += '<option value="' + data[i].id + '">' + data[i].jxnr + '</option>';
        //                 };
        //                 jxnr_content = jxnrhtml;
        //                 // $('#xueduan').html(xdhtml);
        //             } else if (result.isSuccess == 0) {
        //                 console.log("查找教学内容失败");
        //             }
        //         }
        //     });
        //     layer.open({
        //         title: '对应教学内容',
        //         content: jxnr_content,
        //         btn: ["确定", "取消"],
        //         yes: function(index, layero) {
        //             console.log(layero);
        //             jxnr_checked = $("#sz").find("input:checkbox:checked").siblings().html();
        //             console.log(jxnr_checked);
        //             $("#jxnr_view").val(jxnr_checked); //do something
        //             layer.close(index); //如果设定了yes回调，需进行手工关闭
        //         }
        //     });
        //     $("#jxnr_view_cancel").click(function() {
        //         var qingkong = "";
        //         $("#jxnr_view").val(qingkong);
        //     })
        // })
}

function getResourceType() {
    $.ajax({
        type: "get",
        url: "http://192.168.0.104:8080/teachingContent/findResouceType",
        async: true,
        // error: function(XMLHttpRequest, textStatus, errorThrown) {
        //     console.log(errorThrown);
        // },
        crossDomain: true,
        success: function(result) {
            if (result.isSuccess == 1) {
                //var data = eval('(' + result + ')');
                // var data=JSON.parse(result);
                // console.log(result);
                var zylxhtml = "<option value=''>全部</option>";
                for (var i = 0; i < result.data.length; i++) {
                    zylxhtml += '<option  typeId="' + result.data[i].typeId + '>' + result.data[i].typeName + '</option>';
                };
                $('#resourceType').html(zylxhtml);
            } else if (result.isSuccess == 0) {
                console.log("查找学段失败");
            }
        }
    });
    $('#resourceType').on("change", function() {
        getMyResourceManagePageInfo();
        toPage();
    })
}





//分页参数设置 这些全局变量关系到分页的功能
var startAllAppoint = 0; //已翻过信息的条数
var limitAllAppoint = 15; //每页信息条数
var currentPageAllAppoint = 1; //当前页码
var totalPageAllAppoint = 0; //总页数
var dataLength = 0; //向后端发送请求的数据
//ajax请求后台数据
function getMyResourceManagePageInfo() {
    $.ajax({
        type: "post",
        async: false,
        url: "list_my_resource_info",
        data: { start: startAllAppoint, limit: limitAllAppoint, xueduan: $("#xueduan").val(), xueke: $("#xueke").val(), jxnr_view: $("#jxnr_view").val(), resourceType: $("#resourceType").val(), start_time: $("#start_time").val(), end_time: $("#end_time").val(), keyWord: $("#keyWord").val() },
        success: function(data, status) {
            data = eval("(" + data + ")");
            getMyResourceInfo(data);
            startAllAppoint = data.currentResult; //当前页数(后台返回)
            totalPageAllAppoint = data.totalPage; //总页数(后台返回)
        }
    });
}

function getMyResourceInfo(data) {
    var s = '<colgroup><col width ="100" ><col width ="100" ><col width="200"><col width="150"><col width="150"> <col width="320"> <col width="150"> <col width="150"> </colgroup><thead style="background:#b5b7b4;width:1000px;height:30px;line-height:30px;"><th style="text-align:center;"><input type="checkbox" /></th><th style="text-align:center;">ID</th><th style="text-align:center;">名称</th> <th style="text-align:center;">资源类型</th><th style="text-align:center;">分享状态</th> <th style="text-align:center;" class="caozuo">操作</th><th style="text-align:center;">大小</th><th style="text-align:center;">上传时间</th></thead>';
    $.each(data, function(v, o) {
        s += '<tbody><tr><td><input type="checkbox" /></td>';
        s += '<td class="data_id">' + o.id + '</td>';
        s += '<td>' + o.resourceName + '</td>';
        s += '<td>' + o.resourceType + '</td>';
        s += '<td class="shareStatus">' + o.shareStatus + '</td>';
        s += '<td><span id="share" class="share" style="color:#100989;margin-right:12px;">' + o.shareOperation + '</span><span id="download" class="download" style="color:#100989;margin-right:12px;">下载</span><span id="edit" class="edit">编辑</span><span id="delete" class = "delete" style = "color:#f11115;margin-right:12x;margin-left:12px;" > 删除 < /span></td > ';
        s += '<td>' + o.resourceSize + '</td>';
        s += '<td>' + o.resourceUploadTime + '</td></tr></tbody>';
    });
    if (data.length > 0) {
        $("#resourceInfo").html(s);
    } else {
        $("#resourceInfo").html("<br/><span style='width:10%;height:30px;display:block;margin:0 auto;'>暂无数据</span>");
    }
}

function toPage() {

    layui.use(['form', 'laypage', 'layedit', 'layer', 'laydate'], function() {
        var form = layui.form,
            laypage = layui.laypage,
            layedit = layui.layedit,
            layer = layui.layer,
            laydate = layui.laydate;
        var nums = 15;
        //调用分页
        laypage.render({
            cont: 'paged',
            pages: totalPageAllAppoint, //得到总页数                
            curr: currentPageAllAppoint,
            skip: true,
            jump: function(obj, first) {
                currentPageAllAppoint = obj.curr;
                startAllAppoint = (obj.curr - 1) * nums;
                //document.getElementById('biuuu_city_list').innerHTML = render(obj, obj.curr);
                if (!first) { //一定要加此判断，否则初始时会无限刷新
                    getMyResourceManagePageInfo(); //一定要把翻页的ajax请求放到这里，不然会请求两次。
                    //location.href = '?page='+obj.curr;
                }
            }
        });

    });

};

function getStartTime() {

    layui.use(['laydate'], function() {
        var laydate = layui.laydate;
        laydate.render({
            elem: '#start_time'

        });
    });
    $('#start_time').on("change", function() {
        getMyResourceManagePageInfo();
        toPage();
    })

};

function getEndTime() {
    layui.use(['laydate'], function() {
        var laydate = layui.laydate;
        laydate.render({
            elem: '#end_time'
        });
    });
    $('#end_time').on("change", function() {
        getMyResourceManagePageInfo();
        toPage();
    })
};

function search() {
    if (($("#xueduan").val() == '学段') && ($("#xueke").val() == '学科') && ($("#jxnr_view").val() == '') && ($("#resourceType").val() == '全部') && ($("#start_time").val() == '') && ($("#end_time").val() == '') && ($("#keyWord").val() == '')) {
        return;
    } else {
        var searchData = { "xueduan": $("#xueduan").val(), "xueke": $("#xueke").val(), "jxnr": $("#jxnr_view").val(), "resourceType": $("#resourceType").val(), "start_time": $("#start_time").val(), "end_time": $("#end_time").val(), "keyWord": $("#keyWord").val() };
        $.post("url1", searchData, function(str) {
            console.log(str);
            var data = JSON.parse(str);
            getMyResourceInfo(data)
        });
    }
}

function edit(_this) {

    var data_edit_sign = $(_this).parent().parent().children(".data_id").html();
    $.post("url1", { "edit_id": data_edit_sign }, function(str) {
        console.log(str);
        var data = JSON.parse(str);
        $.cookie("edit_id", data_edit_sign, { path: '/', expires: 7 });
        window.location.href = "编辑资源修正.html";
        $("#xuduan").val(data.xueduan);
        $("#xueke").val(data.xueke);
        $("#jxnr_view").val(data.jxnr);
        $("input:radio:checked").val(data.resourceType);
        $("#u11815_input").val(data.resourceName);
        $("#u11747_input").val(data.resourceIntroduce);
        $("#u11798_input").val(data.resourceTag);
    });

    window.location.href = "编辑资源修正.html";
}



function Delete(that) {
    var data_delete_sign = $(that).parent().parent().children(".data_id").html();
    layer.open({
        title: '确认删除',
        content: '确认要删除所选资源吗？删除之后不可恢复。',
        btn: ["确定", "取消"],
        yes: function(index, layero) {
            console.log(layero);
            $.post("http://localhost:8080/resourceType/deleteByTypeId", { "delete_id": data_delete_sign }, function(str) { //url4为后端删除操作动作地址
                if (data === true) {
                    getMyResourceManagePageInfo();
                    toPage();
                    //location.reload();
                    //window.location.href = "编辑资源修正.html";
                } else {
                    console.log(err);
                }
            });
            layer.close(index); //如果设定了yes回调，需进行手工关闭
        }
    })
}


function Download(that1) {
    var data_download_sign = $(that1).parent().parent().children(".data_id").html();
    layer.open({
        title: '下载资源',
        content: '<label>保存路径：</label><input type="text" id="path" required lay-verify="required" autocomplete="off" class="layui-input" style="height:28px;"><input type=button value="选择" onclick=browseFolder(' + 'path' + ')">',
        btn: ["确定", "取消"],
        yes: function(index, layero) {
            console.log(layero);
            // 下载地址发送给后端，后端去保存文件 
            var folder = document.querySelector("#path").value;
            var url = "www.baidu.com/warehouse/spaceexport?token=localStorage.token";
            $.post(url, { "download_id": data_download_sign, "path": folder }, function(data) { //url4为后端删除操作动作地址
                if (data === true) {
                    getMyResourceManagePageInfo();
                    toPage();
                    //location.reload();
                    //window.location.href = "编辑资源修正.html";
                } else {
                    console.log("保存失败");
                }
            }, function(err) {
                console.log(err);
            });
            layer.close(index); //如果设定了yes回调，需进行手工关闭
        }

    })
}

function browseFolder(path) {
    try {
        var Message = "\u8bf7\u9009\u62e9\u6587\u4ef6\u5939"; //选择框提示信息
        var Shell = new ActiveXObject("Shell.Application");
        var Folder = Shell.BrowseForFolder(0, Message, 64, 17); //起始目录为：我的电脑
        //var Folder = Shell.BrowseForFolder(0, Message, 0); //起始目录为：桌面
        if (Folder != null) {
            Folder = Folder.items(); // 返回 FolderItems 对象
            Folder = Folder.item(); // 返回 Folderitem 对象
            Folder = Folder.Path; // 返回路径
            if (Folder.charAt(Folder.length - 1) != "\\") {
                Folder = Folder + "\\";
            }
            document.getElementById(path).value = Folder;
            return Folder;
        }
    } catch (e) {
        alert(e.message);
    }
}

function Share(that2) {
    // $(that2).html("取消分享");
    // $(that2).parent().parent().children(".shareStatus").html("已分享");
    layer.open({
        title: '分享',
        content: '<p >温馨提示：</p><p>1、上传涉及侵权内容的文档将会被移除</p><p >2、为了营造健康绿色网络环境，严禁上传含有淫秽色情、低俗信息或违法违规等文档</p>',
        yes: function(index, layero) {
            console.log(layero);
            // 下载地址发送给后端，后端去保存文件
            //var sharehtml = "";
            var data_share_sign = $(that1).parent().parent().children(".data_id").html();
            $.post(url, { "data_share_sign": data_share_sign }, function(data) {
                if (data === true) {
                    getMyResourceManagePageInfo();
                    toPage();
                } else {
                    console.log("分享失败");
                }
            }, function(err) {
                console.log(err);
            });

            // $(that2).html("取消分享");
            // $(that2).parent().parent().children(".shareStatus").html("已分享");
            // layer.open({
            //     title: '分享成功',
            //     content: '<img src="./images/分享成功/u13003.png" style="display:inline-block;width:220px;height:150px;">',
            // });
            layer.close(index); //如果设定了yes回调，需进行手工关闭
        }
    })
}

function CancelShare(that2) {
    // $(that2).html("取消分享");
    // Share(that2);

    layer.open({
        title: '取消分享',
        content: '您确定取消分享吗？',
        yes: function(index, layero) {
            console.log(layero);
            var data_cancelShare_sign = $(that1).parent().parent().children(".data_id").html();
            $.post(url, { "data_cancelShare_sign": data_cancelShare_sign }, function(data) {
                if (data === true) {
                    getMyResourceManagePageInfo();
                    toPage();
                } else {
                    console.log("取消分享失败");
                }
            }, function(err) {
                console.log(err);
                // $(that2).html("分享");
                //$(that2).parent().parent().children(".shareStatus").html("未分享");

            });
            layer.close(index);
        }
    })

    // $(that2).parent().parent().children(".shareStatus").html("未分享");
    //$(that2).html("分享");
}

function MassSelected() {





}