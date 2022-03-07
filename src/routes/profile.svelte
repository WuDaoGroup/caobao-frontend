<script>
    function downloadFile(){
        const url = "http://localhost:8059/static/test.ipynb";
        const options = {
        method: "GET",
        headers: {
            Accept: "application/octet-stream",
            "Content-Type": "application/octet-stream;charset=UTF-8",
        },
        };
        fetch(url, options)
        .then((response) => response.blob())
        .then((data) => {
            // console.log(data);
            const url = window.URL.createObjectURL(new Blob([data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'code.ipynb'); //or any other extension
            document.body.appendChild(link);
            link.click();
        });
    }
</script>


<form action="#" class="flex flex-wrap">
    <div class="mx-16">
        <h3 class="text-2xl font-semibold">Basic Information</h3>
        <div class="divider" />
        <div class="flex flex-col">
            <div class="form-item w-fit">
                <label class="text-xl">学号</label>
                <input
                    type="text"
                    value="antonia"
                    class="w-full appearance-none text-black text-opacity-50 rounded shadow py-1 px-2 mr-2 focus:outline-none focus:shadow-outline focus:border-blue-200 text-opacity-25 mt-2"  
                />
            </div>

            <div class="form-item w-fit mt-4">
                <label class="text-xl">姓名</label>
                <input
                    type="text"
                    value="antoniaph@gmail.com"
                    class="w-full appearance-none text-black text-opacity-50 rounded shadow py-1 px-2 mr-2 focus:outline-none focus:shadow-outline focus:border-blue-200 text-opacity-25 mt-2"
                />
            </div>
            <div class="form-item w-fit mt-4">
                <label class="text-xl">旧密码</label>
                <input
                    type="text"
                    value="antonia"
                    class="w-full appearance-none text-black text-opacity-50 rounded shadow py-1 px-2 mr-2 focus:outline-none focus:shadow-outline focus:border-blue-200 text-opacity-25 mt-2"
                    
                />
            </div>

            <div class="form-item w-fit mt-4">
                <label class="text-xl">新密码</label>
                <input
                    type="text"
                    value="antoniaph@gmail.com"
                    class="w-full appearance-none text-black text-opacity-50 rounded shadow py-1 px-2 mr-2 focus:outline-none focus:shadow-outline focus:border-blue-200 text-opacity-25 mt-2"
                />
            </div>
        </div>
    </div>

    <div class="mx-16">
        <h3 class="text-2xl font-semibold ">意见反馈</h3>
        <div class="divider" />

        <div class="form-item w-full">
            <label class="text-xl ">Thanks for your suggestions!</label>
            <textarea
                cols="30"
                rows="10"
                class="w-full appearance-none text-black text-opacity-50 rounded shadow py-1 px-2 mr-2 focus:outline-none focus:shadow-outline focus:border-blue-200 text-opacity-25 mt-2"
                
                >Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem natus nobis odio. Lorem
                ipsum dolor sit amet consectetur adipisicing elit. Accusantium, eveniet fugiat? Explicabo
                assumenda dignissimos quisquam perspiciatis corporis sint commodi cumque rem tempora!</textarea
            >
        </div>
    </div>
</form>

<button on:click={downloadFile}>下载</button>