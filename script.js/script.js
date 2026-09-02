/* ================================
   MOBILE MENU
================================ */

const menuBtn = document.getElementById("menuBtn");

const navMenu = document.querySelector(".nav-menu");

menuBtn.addEventListener("click", function () {
  navMenu.classList.toggle("show");
});

/* ================================
   CLOSE MENU AFTER CLICK
================================ */

const navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach(function (link) {
  link.addEventListener("click", function () {
    navMenu.classList.remove("show");
  });
});

/* ================================
   DARK MODE
================================ */

const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", function () {
  document.body.classList.toggle("dark-mode");
});

// hamburgarr end

/* =================================
   FAVORITE BUTTONS
================================= */

const favoriteButtons = document.querySelectorAll(".favorite-btn");

favoriteButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    button.classList.toggle("active");

    if (button.classList.contains("active")) {
      button.textContent = "♥";
    } else {
      button.textContent = "♡";
    }
  });
});

/* =================================
   SHOPPING CART
================================= */

/* =================================
   SHOPPING CART
================================= */

let cart = [];

const cartIcon = document.getElementById("cartIcon");

const cartCount = document.getElementById("cartCount");

const cartPanel = document.getElementById("cartPanel");

const cartOverlay = document.getElementById("cartOverlay");

const closeCart = document.getElementById("closeCart");

const cartItems = document.getElementById("cartItems");

const cartTotal = document.getElementById("cartTotal");

const notification = document.getElementById("cartNotification");

/* OPEN CART */

cartIcon.addEventListener("click", function () {
  cartPanel.classList.add("show");

  cartOverlay.classList.add("show");
});

/* CLOSE CART */

function closeCartPanel() {
  cartPanel.classList.remove("show");

  cartOverlay.classList.remove("show");
}

closeCart.addEventListener("click", closeCartPanel);

cartOverlay.addEventListener("click", closeCartPanel);

/* ADD TO CART */

document.querySelectorAll(".cart-btn").forEach(function (button) {
  button.addEventListener("click", function () {
    const card = button.closest(".car-card");

    const name = card.querySelector("h3").textContent.trim();

    const priceText = card.querySelector(".car-price").textContent.trim();

    const image = card.querySelector("img").src;

    cart.push({
      name: name,
      price: priceText,
      image: image,
      type: "vehicle",
    });

    updateCart();

    showNotification();
  });
});

/* UPDATE CART */

function updateCart() {
  cartCount.textContent = cart.length;

  if (cart.length === 0) {
    cartItems.innerHTML = `
            <div class="empty-cart">

                <div class="empty-cart-icon">
                    🛒
                </div>

                <h3>Your cart is empty</h3>

                <p>
                    Add a vehicle or accessory
                    to see it here.
                </p>

            </div>
        `;

    cartTotal.textContent = "₦0";

    return;
  }

  cartItems.innerHTML = "";

  cart.forEach(function (item, index) {
    const cartItem = document.createElement("div");

    cartItem.className = "cart-item";

    /* Decide what type of item it is */

    const itemType = item.type === "accessory" ? "ACCESSORY" : "VEHICLE";

    cartItem.innerHTML = `

            <img
                src="${item.image}"
                alt="${item.name}"
            >

            <div class="cart-item-info">

                <small>
                    ${itemType}
                </small>

                <h4>
                    ${item.name}
                </h4>

                <strong>
                    ${item.price}
                </strong>

            </div>

            <button
                class="remove-cart-item"
                data-index="${index}"
            >
                ×
            </button>

        `;

    cartItems.appendChild(cartItem);
  });

  /* Remove buttons */

  document.querySelectorAll(".remove-cart-item").forEach(function (button) {
    button.addEventListener("click", function () {
      const index = Number(button.dataset.index);

      cart.splice(index, 1);

      updateCart();
    });
  });

  /* Cart count */

  cartCount.textContent = cart.length;

  /* Show number of items */

  cartTotal.textContent = `${cart.length} item${cart.length > 1 ? "s" : ""}`;
}

/* =================================
   NOTIFICATION
================================= */

function showNotification() {
  notification.classList.add("show");

  setTimeout(function () {
    notification.classList.remove("show");
  }, 2500);
}

// rental

/* =================================
   CAR RENTAL SYSTEM
================================= */

const rentalOverlay = document.getElementById("rentalOverlay");

const closeRental = document.getElementById("closeRental");

const rentButtons = document.querySelectorAll(".rent-now-btn");

const selectedCar = document.getElementById("selectedCar");

const selectedPrice = document.getElementById("selectedPrice");

const rentalTotal = document.getElementById("rentalTotal");

const modalPickupDate = document.getElementById("modalPickupDate");

const modalReturnDate = document.getElementById("modalReturnDate");

const pickupLocation = document.getElementById("pickupLocation");

const pickupDate = document.getElementById("pickupDate");

const returnDate = document.getElementById("returnDate");

let currentRentalPrice = 0;

/* =================================
   SET MINIMUM DATE
================================= */

const today = new Date().toISOString().split("T")[0];

pickupDate.min = today;

returnDate.min = today;

modalPickupDate.min = today;

modalReturnDate.min = today;

/* =================================
   RENT NOW
================================= */

rentButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const car = button.dataset.car;

    const price = Number(button.dataset.price);

    currentRentalPrice = price;

    selectedCar.textContent = car;

    selectedPrice.textContent = `₦${price.toLocaleString()}/day`;

    rentalTotal.textContent = `₦${price.toLocaleString()}`;

    rentalOverlay.classList.add("show");
  });
});

/* =================================
   CLOSE MODAL
================================= */

closeRental.addEventListener("click", function () {
  rentalOverlay.classList.remove("show");
});

rentalOverlay.addEventListener("click", function (event) {
  if (event.target === rentalOverlay) {
    rentalOverlay.classList.remove("show");
  }
});

/* =================================
   CALCULATE RENTAL PRICE
================================= */

function calculateRentalTotal() {
  if (!modalPickupDate.value || !modalReturnDate.value) {
    return;
  }

  const start = new Date(modalPickupDate.value);

  const end = new Date(modalReturnDate.value);

  const difference = end - start;

  const days = Math.ceil(difference / (1000 * 60 * 60 * 24));

  if (days <= 0) {
    rentalTotal.textContent = "Invalid dates";

    return;
  }

  const total = days * currentRentalPrice;

  rentalTotal.textContent = `₦${total.toLocaleString()}`;
}

modalPickupDate.addEventListener("change", calculateRentalTotal);

modalReturnDate.addEventListener("change", calculateRentalTotal);

/* =================================
   SEARCH RENTAL
================================= */

document
  .getElementById("searchRentalBtn")
  .addEventListener("click", function () {
    if (!pickupLocation.value) {
      alert("Please enter a pick-up location.");

      pickupLocation.focus();

      return;
    }

    if (!pickupDate.value) {
      alert("Please select a pick-up date.");

      pickupDate.focus();

      return;
    }

    if (!returnDate.value) {
      alert("Please select a return date.");

      returnDate.focus();

      return;
    }

    if (new Date(returnDate.value) <= new Date(pickupDate.value)) {
      alert("Return date must be after the pick-up date.");

      return;
    }

    document.querySelector(".rental-grid").scrollIntoView({
      behavior: "smooth",
    });
  });

/* =================================
   COPY SEARCH DATES TO MODAL
================================= */

function copyRentalSearch() {
  modalPickupDate.value = pickupDate.value;

  modalReturnDate.value = returnDate.value;

  document.getElementById("modalLocation").value = pickupLocation.value;
}

/* =================================
   UPDATE MODAL WHEN OPENED
================================= */

rentButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    copyRentalSearch();

    calculateRentalTotal();
  });
});

/* =================================
   RENTAL FORM
================================= */

document
  .getElementById("rentalForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("renterName").value;

    alert(`Thank you ${name}! Your rental request has been received.`);

    rentalOverlay.classList.remove("show");

    this.reset();
  });

// REPAIR

/* =================================
   REPAIR & SERVICE BOOKING
================================= */

const serviceOverlay = document.getElementById("serviceOverlay");

const closeService = document.getElementById("closeService");

const serviceButtons = document.querySelectorAll(".book-service");

const selectedService = document.getElementById("selectedService");

const serviceDate = document.getElementById("serviceDate");

const serviceForm = document.getElementById("serviceForm");

const diagnosisBtn = document.getElementById("diagnosisBtn");

/* =================================
   MINIMUM DATE
================================= */

const serviceToday = new Date().toISOString().split("T")[0];

serviceDate.min = serviceToday;

/* =================================
   OPEN SERVICE MODAL
================================= */

serviceButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    selectedService.textContent = button.dataset.service;

    serviceOverlay.classList.add("show");
  });
});

/* =================================
   DIAGNOSIS BUTTON
================================= */

diagnosisBtn.addEventListener("click", function () {
  selectedService.textContent = "General Vehicle Diagnosis";

  serviceOverlay.classList.add("show");
});

/* =================================
   CLOSE MODAL
================================= */

closeService.addEventListener("click", function () {
  serviceOverlay.classList.remove("show");
});

/* CLOSE WHEN CLICKING OUTSIDE */

serviceOverlay.addEventListener("click", function (event) {
  if (event.target === serviceOverlay) {
    serviceOverlay.classList.remove("show");
  }
});

/* =================================
   SUBMIT SERVICE REQUEST
================================= */

serviceForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.getElementById("serviceName").value;

  const vehicleMake = document.getElementById("vehicleMake").value;

  const vehicleModel = document.getElementById("vehicleModel").value;

  const selected = selectedService.textContent;

  alert(
    `Thank you ${name}!\n\n` +
      `Service: ${selected}\n` +
      `Vehicle: ${vehicleMake} ${vehicleModel}\n\n` +
      `Your service request has been received.`,
  );

  serviceOverlay.classList.remove("show");

  serviceForm.reset();
});

// accessories

/* =========================================
   AUTO PARTS — CATEGORY FILTER
========================================= */

document.querySelectorAll(".auto-tab").forEach(function (tab) {
  tab.addEventListener("click", function () {
    /* Remove active from all tabs */

    document.querySelectorAll(".auto-tab").forEach(function (item) {
      item.classList.remove("active");
    });

    /* Add active to clicked tab */

    tab.classList.add("active");

    /* Get selected category */

    const selectedType = tab.dataset.type;

    /* Filter products */

    document.querySelectorAll(".auto-product").forEach(function (product) {
      const productType = product.dataset.type;

      if (selectedType === "all" || selectedType === productType) {
        product.style.display = "";
      } else {
        product.style.display = "none";
      }
    });
  });
});

/* =========================================
   AUTO PARTS — FAVORITES
========================================= */

document.querySelectorAll(".auto-favorite").forEach(function (button) {
  button.addEventListener("click", function () {
    button.classList.toggle("active");

    if (button.classList.contains("active")) {
      button.textContent = "♥";
    } else {
      button.textContent = "♡";
    }
  });
});

/* =========================================
   AUTO PARTS — ADD TO EXISTING CART
========================================= */

document.querySelectorAll(".auto-cart-button").forEach(function (button) {
  button.addEventListener("click", function () {
    /* Get product information */

    const productName = button.dataset.productName;

    const productPrice = Number(button.dataset.productPrice);

    const productImage = button.dataset.productImage;

    /* =====================================
           USE YOUR EXISTING CART
           DO NOT CREATE: let cart = []
        ===================================== */

    if (typeof cart === "undefined") {
      console.error("Existing cart variable was not found.");

      return;
    }

    /* Add product */

    cart.push({
      name: productName,

      price: productPrice,

      image: productImage,
    });

    /* Update your existing cart */

    if (typeof updateCart === "function") {
      updateCart();
    }

    /* Show feedback */

    button.textContent = "✓ Added";

    button.classList.add("added");

    /* Return button to normal */

    setTimeout(function () {
      button.textContent = "+ Cart";

      button.classList.remove("added");
    }, 1500);
  });
});

/* ================================
   ACCESSORIES CART
================================ */

const accessoryCartButtons = document.querySelectorAll(".add-part-cart");

accessoryCartButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const name = button.dataset.name;

    const price = Number(button.dataset.price);

    const image = button.dataset.image;

    cart.push({
      name: name,

      price: `₦${price.toLocaleString()}`,

      image: image,

      type: "accessory",
    });

    updateCart();

    showNotification(name);

    button.textContent = "✓ Added";

    button.classList.add("added");

    setTimeout(function () {
      button.textContent = "+ Cart";

      button.classList.remove("added");
    }, 1500);
  });
});

// WHY CHOOSE US

/* =================================
   WHY CHOOSE US
================================= */

const whyButtons =
    document.querySelectorAll(".why-more");


whyButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const title =
            button.dataset.title;

        const text =
            button.dataset.text;


        alert(
            title + "\n\n" + text
        );

    });

});

/* =================================
   ANIMATED COUNTERS
================================= */

const counters =
    document.querySelectorAll(".counter");

let counterStarted = false;


function startCounters() {

    if (counterStarted) return;

    counterStarted = true;


    counters.forEach(function(counter) {

        const target =
            Number(counter.dataset.target);

        let current = 0;

        const increment =
            Math.ceil(target / 60);


        const timer =
            setInterval(function() {

                current += increment;


                if (current >= target) {

                    current = target;

                    clearInterval(timer);

                }


                counter.textContent =
                    current.toLocaleString();

            }, 25);

    });

}


/* Detect when stats enter screen */

const statsSection =
    document.querySelector(".why-stats");


const statsObserver =
    new IntersectionObserver(
        function(entries) {

            if (entries[0].isIntersecting) {

                startCounters();

                statsObserver.disconnect();

            }

        },
        {
            threshold: 0.3
        }
    );


statsObserver.observe(statsSection);



// REVIEW

/* =================================
   CUSTOMER REVIEWS
================================= */

const reviews = [

    {
        name: "Daniel Okafor",
        role: "Vehicle Buyer",
        rating: 5,
        text:
        "The whole process was incredibly smooth. " +
        "The team helped me find the right vehicle " +
        "and made everything easy."
    },

    {
        name: "Sarah Williams",
        role: "Car Rental Customer",
        rating: 5,
        text:
        "I rented a vehicle for a weekend trip and " +
        "the experience was excellent. The car was " +
        "clean, comfortable and ready on time."
    },

    {
        name: "Michael James",
        role: "Service Customer",
        rating: 4,
        text:
        "The technicians explained the problem clearly " +
        "and kept me updated throughout the repair. " +
        "Very professional service."
    }

];


let currentReview = 0;


/* ELEMENTS */

const reviewStars =
    document.getElementById("reviewStars");

const reviewText =
    document.getElementById("reviewText");

const customerName =
    document.getElementById("customerName");

const customerRole =
    document.getElementById("customerRole");

const customerAvatar =
    document.getElementById("customerAvatar");

const reviewNumber =
    document.getElementById("reviewNumber");

const reviewProgress =
    document.getElementById("reviewProgress");


/* =================================
   DISPLAY REVIEW
================================= */

function displayReview(index) {

    const review = reviews[index];


    reviewStars.textContent =
        "★".repeat(review.rating) +
        "☆".repeat(5 - review.rating);


    reviewText.textContent =
        `"${review.text}"`;


    customerName.textContent =
        review.name;


    customerRole.textContent =
        review.role;


    /* Avatar initials */

    const names =
        review.name.split(" ");

    customerAvatar.textContent =
        names[0][0] +
        names[names.length - 1][0];


    /* Counter */

    reviewNumber.textContent =
        String(index + 1).padStart(2, "0") +
        " / " +
        String(reviews.length).padStart(2, "0");


    /* Progress */

    reviewProgress.style.width =
        ((index + 1) / reviews.length * 100) +
        "%";

}


/* FIRST REVIEW */

displayReview(currentReview);


/* =================================
   NEXT
================================= */

document
    .getElementById("nextReview")
    .addEventListener("click", function() {

        currentReview++;

        if (currentReview >= reviews.length) {
            currentReview = 0;
        }

        displayReview(currentReview);

    });


/* =================================
   PREVIOUS
================================= */

document
    .getElementById("previousReview")
    .addEventListener("click", function() {

        currentReview--;

        if (currentReview < 0) {
            currentReview = reviews.length - 1;
        }

        displayReview(currentReview);

    });

    /* =================================
   REVIEW MODAL
================================= */

const reviewOverlay =
    document.getElementById("reviewOverlay");

const openReview =
    document.getElementById("openReview");

const closeReview =
    document.getElementById("closeReview");

const reviewForm =
    document.getElementById("reviewForm");


/* OPEN */

openReview.addEventListener(
    "click",
    function() {

        reviewOverlay.classList.add("show");

    }
);


/* CLOSE */

closeReview.addEventListener(
    "click",
    function() {

        reviewOverlay.classList.remove("show");

    }
);


/* CLICK OUTSIDE */

reviewOverlay.addEventListener(
    "click",
    function(event) {

        if (
            event.target === reviewOverlay
        ) {

            reviewOverlay.classList.remove("show");

        }

    }
);

/* =================================
   STAR RATING
================================= */

const ratingButtons =
    document.querySelectorAll(
        ".rating-picker button"
    );

const reviewRating =
    document.getElementById("reviewRating");


ratingButtons.forEach(function(button) {

    button.addEventListener(
        "click",
        function() {

            const rating =
                Number(button.dataset.rating);


            reviewRating.value =
                rating;


            ratingButtons.forEach(
                function(star) {

                    const starRating =
                        Number(
                            star.dataset.rating
                        );


                    if (
                        starRating <= rating
                    ) {

                        star.classList.add(
                            "active"
                        );

                    } else {

                        star.classList.remove(
                            "active"
                        );

                    }

                }
            );

        }
    );

});


/* Default 5 stars */

ratingButtons.forEach(function(star) {

    star.classList.add("active");

});

/* =================================
   SUBMIT REVIEW
================================= */

reviewForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const name =
            document.getElementById(
                "reviewName"
            ).value.trim();


        const role =
            document.getElementById(
                "reviewRole"
            ).value;


        const rating =
            Number(
                document.getElementById(
                    "reviewRating"
                ).value
            );


        const text =
            document.getElementById(
                "reviewMessage"
            ).value.trim();


        /* Add new review */

        reviews.push({

            name: name,

            role: role,

            rating: rating,

            text: text

        });


        /* Show new review */

        currentReview =
            reviews.length - 1;


        displayReview(currentReview);


        /* Close modal */

        reviewOverlay.classList.remove(
            "show"
        );


        /* Reset form */

        reviewForm.reset();


        /* Reset stars */

        reviewRating.value = 5;

        ratingButtons.forEach(
            function(star) {

                star.classList.add("active");

            }
        );


        /* Confirmation */

        alert(
            "Thank you for your review, " +
            name +
            "!"
        );

    }
);


// contect 

// =================================
// CONTACT & APPOINTMENT
// =================================

const contactBookingForm =
    document.getElementById(
        "contactBookingForm"
    );

const contactBookingDate =
    document.getElementById(
        "contactBookingDate"
    );

const contactBookingSuccess =
    document.getElementById(
        "contactBookingSuccess"
    );


// =================================
// SET MINIMUM CONTACT DATE
// =================================

const contactCurrentDate =
    new Date().toISOString().split("T")[0];


if (contactBookingDate) {

    contactBookingDate.min =
        contactCurrentDate;

}


// =================================
// CONTACT FORM SUBMIT
// =================================

if (contactBookingForm) {

    contactBookingForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const customerName =
                document.getElementById(
                    "contactCustomerName"
                ).value.trim();


            const customerPhone =
                document.getElementById(
                    "contactCustomerPhone"
                ).value.trim();


            const customerEmail =
                document.getElementById(
                    "contactCustomerEmail"
                ).value.trim();


            const serviceType =
                document.getElementById(
                    "contactServiceType"
                ).value;


            const vehicleName =
                document.getElementById(
                    "contactVehicleName"
                ).value.trim();


            const bookingDate =
                document.getElementById(
                    "contactBookingDate"
                ).value;


            const bookingTime =
                document.getElementById(
                    "contactBookingTime"
                ).value;


            const customerMessage =
                document.getElementById(
                    "contactCustomerMessage"
                ).value.trim();


            // =================================
            // VALIDATION
            // =================================

            if (
                !customerName ||
                !customerPhone ||
                !customerEmail ||
                !serviceType ||
                !bookingDate ||
                !bookingTime
            ) {

                alert(
                    "Please complete all required fields."
                );

                return;

            }


            // =================================
            // CHECK DATE
            // =================================

            if (
                bookingDate <
                contactCurrentDate
            ) {

                alert(
                    "Please select a valid future date."
                );

                return;

            }


            // =================================
            // SUCCESS MESSAGE
            // =================================

            contactBookingSuccess.textContent =
                "✓ Thanks " +
                customerName +
                "! Your " +
                serviceType.toLowerCase() +
                " request has been received.";


            contactBookingSuccess.classList.add(
                "show"
            );


            // =================================
            // OPTIONAL CONSOLE DATA
            // =================================

            console.log({

                name: customerName,

                phone: customerPhone,

                email: customerEmail,

                service: serviceType,

                vehicle: vehicleName,

                date: bookingDate,

                time: bookingTime,

                message: customerMessage

            });


            // =================================
            // RESET FORM
            // =================================

            contactBookingForm.reset();


            // =================================
            // HIDE SUCCESS MESSAGE
            // =================================

            setTimeout(
                function () {

                    contactBookingSuccess.classList.remove(
                        "show"
                    );

                },
                6000
            );

        }
    );

}


// footer

/* =================================
   FOOTER NEWSLETTER
================================= */

const newsletterForm =
    document.getElementById("newsletterForm");

const newsletterEmail =
    document.getElementById("newsletterEmail");


if (newsletterForm) {

    newsletterForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();

            const email =
                newsletterEmail.value.trim();

            if (!email) {
                return;
            }

            alert(
                "Thanks for subscribing! " +
                "We'll send updates to " +
                email
            );

            newsletterForm.reset();

        }
    );

}

/* =================================
   BACK TO TOP
================================= */

const backToTop =
    document.getElementById("backToTop");


if (backToTop) {

    backToTop.addEventListener(
        "click",
        function() {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );

}