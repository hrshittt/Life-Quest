const sidebar = document.getElementById("sidebar");
    const hamburger = document.getElementById("hamburger");
    const closeBtn = document.getElementById("closeBtn");

    hamburger.addEventListener("click", () => {
      sidebar.classList.add("active");
    });

    closeBtn.addEventListener("click", () => {
      sidebar.classList.remove("active");
    });

  document.getElementById("About").addEventListener("click", function(event) {
    event.preventDefault(); // prevent default jump
    const section = document.getElementById("About-section");
    section.scrollIntoView({ behavior: "smooth" });
  });

  const testimonialsLink = document.getElementById("Testimonials");
  const section2 = document.getElementById("testimonials_section");
    testimonialsLink.addEventListener("click", function (event) {
      event.preventDefault();
      section2.scrollIntoView({ behavior: "smooth" });
    });
  
const aboutus = document.getElementsByClassName("container");
aboutus.addEventListener("click",()=>{
  
})

