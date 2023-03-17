<div class="formData frm">
    <form class="upl">
        <span>Menu</span>
        <div class="btnClose">
            X
        </div>
        <div class="form-group">
            <label for="txt-id">ID</label>
            <input type="number" class="form-control" id="txt-id" name="txt-id">
        </div>
        <div class="form-group">
            <label for="txt-title">Title</label>
            <input type="text" class="form-control" id="txt-title" name="txt-title">
        </div>
        <div class="form-group">
            <label for="txt-order">Order</label>
            <input type="number" class="form-control" id="txt-order" name="txt-order">
        </div>
        <div class="form-group mb-3">
            <label for="txt-status">Status</label>
            <select class="form-control" id="txt-status" name="txt-status">
                <option value="1">Active</option>
                <option value="0">Disable</option>
            </select>
        </div>
        <div class="image-box">
            <div class="txt-image">
                <input type="file" name="txt-file" id="txt-file">
                <input type="hidden" name="txt-img-name" id="txt-img-name">   
            </div>
        </div>
        <button type="button" id="btnSave" class="mt-3 btn btn-success float-left">Save</button>
    </form>
</div>