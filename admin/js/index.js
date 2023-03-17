$(document).ready(function(){
    var body = $("body");
    const popup = `<div class="popup"></div> `;
    var frmOpt;
    var frm = ["frm-menu.php","frm-news.php"];
    var tbl = $('#tblData');
    function get_auto_id(){
        var id = body.find(".frm #txt-id");
        var order = body.find(".frm #txt-order");
        $.ajax({
            url:'action/get-auto-id.php',
            type:'POST',
            data:{opt:frmOpt},
            // contentType:false,
            cache:false,
            // processData:false,
            dataType:"json",
            beforeSend:function(){
                  
            },
            success:function(data){   
                if( data['id'] == null ){
                    id.val( 1 ); 
                    order.val( 1 );
                }else{
                    id.val( parseInt(data['id'])+1 );   
                    order.val( parseInt(data['id'])+1 );   
                }
            }				
        }); 
    }

    // get news
    function get_news(){
        var th = `
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Title</th>
                    <th scope="col">Image</th>
                    <th scope="col">Order</th>
                    <th scope="col">Status</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
        `;
        var txt = '';
        $.ajax({
            url:'action/get-news.php',
            type:'POST',
            data:{},
            // contentType:false,
            cache:false,
            // processData:false,
            // dataType:"json",
            beforeSend:function(){
                
            },
            success:function(data){ 
                tbl.html(th);
            }				
        }); 
    }

    // get menu
    function get_menu(){
        var th = `
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Title</th>
                        <th scope="col">Image</th>
                        <th scope="col">Order</th>
                        <th scope="col">Status</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
        `;
        var txt = '';
        $.ajax({
            url:'action/get-menu.php',
            type:'POST',
            data:{},
            // contentType:false,
            cache:false,
            // processData:false,
            dataType:"json",
            beforeSend:function(){
                  
            },
            success:function(data){ 
                for(i in data){
                    txt += `
                        <tr>
                            <td>${data[i]['id']}</td>
                            <td>${data[i]['title']}</td>
                            <td>
                                <img src="img/${data[i]['img']}">
                            </td>
                            <td>${data[i]['order']}</td>
                            <td>${data[i]['status']}</td>
                            <td></td>
                        </tr>
                    `;
                } 
                tbl.html(th + txt);
            }				
        }); 
    }

    // btnAdd
    body.on("click","#btnAdd",function(){
        body.append(popup);
        $(".popup").load("frm/"+frm[frmOpt], function(responseTxt, statusTxt, xhr){
            if(statusTxt == "success")
                get_auto_id();
            if(statusTxt == "error")
              alert("Error: " + xhr.status + ": " + xhr.statusText);
        });
    });

    // btnClose
    body.on("click",".frm .btnClose",function(){
        body.find(".popup").remove();
    });

    body.on("click","#left-menu ul .subMenu li",function(){
        var eThis = $(this);
        frmOpt = eThis.data("opt");
        body.find(".btn_box #btnAdd").show();
        if( frmOpt == 0 ){
            get_menu();
        }else if( frmOpt == 1 ){
            get_news();
        }
    });

    body.on("click",".frm #btnSave",function(){
        var eThis = $(this);
        if( frmOpt == 0 ){
            save_menu(eThis);
        }else if( frmOpt == 1 ){
            save_news();
        }

    });

     // save menu
    function save_menu(eThis){
        var Parent = eThis.parents(".frm");
        var title = Parent.find("#txt-title");
        var id = Parent.find("#txt-id");
        var img = Parent.find("#txt-img-name");
        var order = Parent.find("#txt-order");
        var status = Parent.find("#txt-status");
        var frm = eThis.closest('form.upl');
        var frm_data = new FormData(frm[0]);
        $.ajax({
            url:'action/save-menu.php',
            type:'POST',
            data:frm_data,
            contentType:false,
            cache:false,
            processData:false,
            dataType:"json",
            beforeSend:function(){
                  
            },
            success:function(data){   
                var tr = `
                    <tr>
                        <td>${data.id}</td>
                        <td>${title.val()}</td>
                        <td>
                            <img src="img/${img.val()}">
                        </td>
                        <td>${order.val()}</td>
                        <td>${status.val()}</td>
                        <td></td>
                    </tr>
                `;   
                tbl.find("tr:eq(0)").after(tr);   
                body.find(".popup").remove();
            }				
        }); 
    }

    // save news
    function save_news(){
        alert("Save News");
    }

    // upload image
    body.on("change",".frm #txt-file", function(){
        var imgLoading = "<div class='img-loadding'></div>";
        var imgClose = "<div class='img-close'></div>";
        var eThis = $(this);
        var Parent = eThis.parents('.frm');
        var imgBox = Parent.find('.txt-image');
        var imgName = Parent.find('#txt-img-name');
        var frm = eThis.closest('form.upl');
        var frm_data = new FormData(frm[0]);
        $.ajax({
            url:'action/upl-img.php',
            type:'POST',
            data:frm_data,
            contentType:false,
            cache:false,
            processData:false,
            dataType:"json",
            beforeSend:function(){

                imgBox.append(imgLoading);

            },
            success:function(data){  

                imgBox.css({"background-image":`url(img/${data.imgName})`});
                imgName.val(data.imgName);
                imgBox.find('.img-loadding').remove();
                imgBox.append(imgClose);

            }				
        }); 
    });

    // btn close
    body.on("click",".img-close", function(){
        $(this).parents('.txt-image').css({"background-image":`url(css/bg-img.webp)`});
        $(this).parents('.txt-img-name').val('');
        $(this).parents('.txt-file').val('');
        $(this).remove();
    });

});
