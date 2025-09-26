document.addEventListener('DOMContentLoaded', () => {
    const galleriesContainer = document.getElementById('galleries-container');
    const searchInput = document.getElementById('searchInput');
    const clearSearchBtn = document.getElementById('clearSearch');
    
    // 存储所有图片数据
    let allImageData = {};
    
    // 页面加载时初始化并加载本地图片
    loadLocalImages();

    // 加载本地图片
    function loadLocalImages() {
        // 定义图片分类数据（模拟原来从服务器获取的数据）
        allImageData = {
            "光影": [
                "img/光影/专业摄影光.jpg",
                "img/光影/伦勃朗光.jpg",
                "img/光影/低健氛围光.jpg",
                "img/光影/侧逆光轮廓.jpg",
                "img/光影/冷色调光.jpg",
                "img/光影/戏剧高对比.jpg",
                "img/光影/日间窗光（侧光）.jpg",
                "img/光影/日间窗光（逆光）.jpg",
                "img/光影/柔和自然光.jpg",
                "img/光影/混合光.jpg",
                "img/光影/温暖灯光.jpg",
                "img/光影/环形灯（正面）.jpg",
                "img/光影/硬光直射.jpg",
                "img/光影/背光剪影.jpg",
                "img/光影/蓝调时刻.jpg",
                "img/光影/蝴蝶光.jpg",
                "img/光影/软光箱（棚拍）.jpg",
                "img/光影/通用光影.jpg",
                "img/光影/阴天漫反射.jpg",
                "img/光影/高键干净光.jpg",
                "img/光影/黄金时刻.jpg"
            ],
            "氛围风格": [
                "img/氛围风格/极简陈列、留白充足、安静克制.jpg",
                "img/氛围风格/活力阳光、年轻明快.jpg",
                "img/氛围风格/温暖治愈、柔和雅致、舒适亲和.jpg",
                "img/氛围风格/现代质感、精致高级、理性清爽.jpg"
            ],
            "背景主题:色调": [
                "img/背景主题:色调/低饱和奶油色（治愈温馨）.jpg",
                "img/背景主题:色调/光影交错（百叶窗+光影线条+现代感）.jpg",
                "img/背景主题:色调/暖米色棚拍背景（温馨舒适）.jpg",
                "img/背景主题:色调/棚拍转角·冷灰蓝（极简高键）.jpg",
                "img/背景主题:色调/棚拍转角·暖杏色（墙地无缝纸，长投影）.jpg",
                "img/背景主题:色调/浅米色无缝背景（温暖中性）.jpg",
                "img/背景主题:色调/米白色纯色背景（柔和专业）.jpg",
                "img/背景主题:色调/纯白无缝纸（电商主图）.jpg",
                "img/背景主题:色调/莫兰迪米灰（安静高级）.jpg",
                "img/背景主题:色调/霓虹灯效（彩色灯光+现代氛围+时尚感）.jpg"
            ],
            "镜头角度": [
                "img/镜头角度/侧面拍摄.jpg",
                "img/镜头角度/俯视角度.jpg",
                "img/镜头角度/斜角拍摄.jpg",
                "img/镜头角度/正面拍摄.jpg",
                "img/镜头角度/通用角度.jpg"
            ]
        };
        
        // 对每个分类中的图片按名称排序
        for (const category in allImageData) {
            allImageData[category].sort((a, b) => {
                const nameA = a.split('/').pop().replace(/\.(png|jpe?g|gif|webp)$/i, '');
                const nameB = b.split('/').pop().replace(/\.(png|jpe?g|gif|webp)$/i, '');
                return nameA.localeCompare(nameB);
            });
        }
        
        // 显示所有图片
        displayImages(allImageData);
    }
    
    // 显示图片
    function displayImages(imageData) {
        // 清空容器
        galleriesContainer.innerHTML = '';
        
        // 统计数据
        const totalCategories = Object.keys(imageData).length;
        let totalImages = 0;
        let displayedCategories = 0;
        let displayedImages = 0;
        
        // 计算总图片数量
        for (const category in imageData) {
            totalImages += imageData[category].length;
        }
        
        console.log(`📊 图片数据统计:`);
        console.log(`   总文件夹数量: ${totalCategories}`);
        console.log(`   总图片数量: ${totalImages}`);
        
        if (Object.keys(imageData).length === 0) {
            galleriesContainer.innerHTML = '<p>未找到匹配的图片。</p>';
            return;
        }

        for (const category in imageData) {
            // 跳过空文件夹（没有图片的分类）
            if (!imageData[category] || imageData[category].length === 0) {
                console.log(`❌ 跳过空文件夹: ${category} (图片数量: ${imageData[category].length})`);
                continue;
            }

            // 统计实际显示的文件夹和图片
            displayedCategories++;
            displayedImages += imageData[category].length;
            
            console.log(`✅ 显示文件夹: ${category} (图片数量: ${imageData[category].length})`);

            const categoryContainer = document.createElement('div');
            categoryContainer.className = 'category-container';

            const title = document.createElement('h1');
            title.textContent = category.replace(/[:：]/g, '：'); // 统一冒号
            categoryContainer.appendChild(title);

            const gallery = document.createElement('div');
            gallery.className = 'gallery';

            imageData[category].forEach(imageSrc => {
                const item = document.createElement('div');
                item.className = 'item';

                const p = document.createElement('p');
                // 从路径中提取文件名作为标题
                const fileName = imageSrc.split('/').pop().replace(/\.(png|jpe?g|gif|webp)$/i, '');
                p.textContent = fileName;

                const img = document.createElement('img');
                img.src = imageSrc;
                img.alt = fileName;
                
                // 添加图片加载错误处理
                img.onerror = function() {
                    console.error(`Failed to load image: ${imageSrc}`);
                    this.style.display = 'none';
                    const errorText = document.createElement('p');
                    errorText.textContent = '图片加载失败';
                    errorText.style.color = '#ff3b30';
                    errorText.style.fontSize = '12px';
                    item.appendChild(errorText);
                };

                // 添加点击事件，显示大图
                item.addEventListener('click', () => {
                    showModal(imageSrc, fileName);
                });

                item.appendChild(p);
                item.appendChild(img);
                gallery.appendChild(item);
            });

            categoryContainer.appendChild(gallery);
            galleriesContainer.appendChild(categoryContainer);
        }
        
        // 打印最终显示统计
        console.log(`🎯 最终页面显示统计:`);
        console.log(`   显示文件夹数量: ${displayedCategories}`);
        console.log(`   显示图片数量: ${displayedImages}`);
        console.log(`   跳过空文件夹数量: ${totalCategories - displayedCategories}`);
    }
    
    // 搜索功能
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase().trim();
        
        if (searchTerm === '') {
            // 如果搜索框为空，显示所有图片
            displayImages(allImageData);
            return;
        }
        
        // 过滤图片
        const filteredData = {};
        for (const category in allImageData) {
            const filteredImages = allImageData[category].filter(imageSrc => {
                const fileName = imageSrc.split('/').pop().replace(/\.(png|jpe?g|gif|webp)$/i, '');
                return fileName.toLowerCase().includes(searchTerm);
            });
            
            if (filteredImages.length > 0) {
                filteredData[category] = filteredImages;
            }
        }
        
        // 显示过滤后的图片
        displayImages(filteredData);
    });
    
    // 清除搜索
    clearSearchBtn.addEventListener('click', function() {
        searchInput.value = '';
        displayImages(allImageData);
    });
});

// 显示大图模态框的函数
function showModal(imageSrc, fileName) {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    
    // 设置图片和标题
    modalImage.src = imageSrc;
    modalImage.alt = fileName;
    modalTitle.textContent = fileName;
    
    // 显示模态框
    modal.style.display = 'block';
    
    // 添加动画效果
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);
}

// 关闭模态框的函数
function closeModal() {
    const modal = document.getElementById('imageModal');
    modal.style.display = 'none';
}

// 点击关闭按钮关闭模态框
document.addEventListener('DOMContentLoaded', () => {
    const closeBtn = document.querySelector('.close');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    // 点击模态框背景关闭模态框
    const modal = document.getElementById('imageModal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
    
    // 按ESC键关闭模态框
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
});