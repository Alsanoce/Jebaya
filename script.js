document.addEventListener('DOMContentLoaded', function() {
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('meterImage');
    const form = document.getElementById('meterForm');
    const successMessage = document.getElementById('successMessage');
    
    // رفع الصورة عند النقر على المنطقة
    uploadArea.addEventListener('click', function() {
        fileInput.click();
    });
    
    // تغيير مظهر منطقة الرفع عند وجود ملف
    fileInput.addEventListener('change', function() {
        if (fileInput.files.length > 0) {
            uploadArea.innerHTML = `
                <i class="fas fa-check-circle" style="color: #28a745;"></i>
                <p>تم اختيار صورة: ${fileInput.files[0].name}</p>
                <p style="font-size: 12px; margin-top: 5px;">انقر لتغيير الصورة</p>
            `;
        }
    });
    
    // إرسال النموذج
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const meterNumber = document.getElementById('meterNumber').value;
        const meterReading = document.getElementById('meterReading').value;
        
        // إنشاء رسالة واتساب
        const whatsappMessage = `قراءة عداد كهرباء%0Aرقم العداد: ${meterNumber}%0Aالقراءة: ${meterReading} ك.و.س`;
        
        // فتح واتساب مع الرسالة
        window.open(`https://wa.me/?text=${whatsappMessage}`, '_blank');
        
        // إظهار رسالة نجاح
        successMessage.style.display = 'block';
        
        // إعادة تعيين النموذج بعد 3 ثوان
        setTimeout(function() {
            form.reset();
            successMessage.style.display = 'none';
            uploadArea.innerHTML = `
                <i class="fas fa-cloud-upload-alt"></i>
                <p>انقر أو اسحب الصورة هنا لرفعها</p>
            `;
        }, 3000);
    });
    
    // تأثير سحب وإسقاط للصورة
    uploadArea.addEventListener('dragover', function(e) {
        e.preventDefault();
        this.style.borderColor = '#0066cc';
        this.style.background = '#d9ebff';
    });
    
    uploadArea.addEventListener('dragleave', function() {
        this.style.borderColor = '#ced4da';
        this.style.background = '#f8f9fa';
    });
    
    uploadArea.addEventListener('drop', function(e) {
        e.preventDefault();
        this.style.borderColor = '#ced4da';
        this.style.background = '#f8f9fa';
        
        if (e.dataTransfer.files.length) {
            fileInput.files = e.dataTransfer.files;
            
            uploadArea.innerHTML = `
                <i class="fas fa-check-circle" style="color: #28a745;"></i>
                <p>تم اختيار صورة: ${e.dataTransfer.files[0].name}</p>
                <p style="font-size: 12px; margin-top: 5px;">انقر لتغيير الصورة</p>
            `;
        }
    });
});