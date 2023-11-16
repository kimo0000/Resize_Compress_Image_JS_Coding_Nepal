const wrapper = document.querySelector(".wrapper"),
  header = wrapper.querySelector(".wrapper header"),
  fileInput = wrapper.querySelector(".wrapper input"),
  img = wrapper.querySelector("header img"),
  paragraph = wrapper.querySelector("header p"),
  inpWidth = wrapper.querySelector(".inputs_width input"),
  inpHeight = wrapper.querySelector(".inputs_height input"),
  checkRadio = wrapper.querySelector(".check_radio input"),
  qualityRadio = wrapper.querySelector(".check_quality input"),
  dowloadBtn = wrapper.querySelector(".dowload");

  console.log(inpWidth, inpHeight);

let originalImg;

fileInput.addEventListener('input', (e) => {
    const file = e.target.files[0];
    if(!file) return;
    img.src = URL.createObjectURL(file);
    img.addEventListener('load', () => {
        inpWidth.value = img.naturalWidth;
        inpHeight.value = img.naturalHeight;
        originalImg = img.naturalWidth / img.naturalHeight;
    })
    wrapper.classList.add('active');
})

inpWidth.addEventListener('input', (e) => {
    inpHeight.value = checkRadio.checked
      ? parseInt(Number(inpWidth.value) / originalImg)
      : img.naturalHeight;
})

inpHeight.addEventListener("input", (e) => {
  inpWidth.value = checkRadio.checked
    ? parseInt(Number(inpHeight.value) * originalImg)
    : img.naturalWidth;
});

dowloadBtn.addEventListener('click', () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const link = document.createElement('a');

    const qualityImg = qualityRadio.checked ? 0.7 : 1.0;

    canvas.width = inpWidth.value;
    canvas.height = inpHeight.value;

    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    
    link.href = canvas.toDataURL("imgs/jpg", qualityImg);
    link.download = new Date().getTime();
    link.click();
});
header.addEventListener("click", () => fileInput.click());