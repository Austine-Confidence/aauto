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





document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       ELEMENTS
    ========================================== */

    const rentalCards =
        [...document.querySelectorAll(".rental-card")];

    const categoryButtons =
        document.querySelectorAll(".category-btn");

    const rentalCount =
        document.getElementById("rentalCount");

    const rentalEmpty =
        document.getElementById("rentalEmpty");


    let selectedCategory = "all";

    let selectedRental = null;

    let rentalBooking = null;


    /* =========================================
       CATEGORY FILTER
    ========================================== */

    function filterRentals() {

        let visible = 0;

        rentalCards.forEach(card => {

            const category =
                card.dataset.category;


            const matches =
                selectedCategory === "all" ||
                category === selectedCategory;


            if (matches) {

                card.style.display = "";

                visible++;

            } else {

                card.style.display = "none";

            }

        });


        rentalCount.textContent =
            `${visible} Vehicles`;


        rentalEmpty.style.display =
            visible === 0
                ? "block"
                : "none";

    }


    categoryButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                categoryButtons.forEach(
                    btn =>
                        btn.classList.remove(
                            "active"
                        )
                );


                button.classList.add(
                    "active"
                );


                selectedCategory =
                    button.dataset.category;


                filterRentals();

            }
        );

    });


    /* =========================================
       FAVORITES
    ========================================== */

    document
        .querySelectorAll(".rental-favorite")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    button.classList.toggle(
                        "active"
                    );


                    button.textContent =
                        button.classList.contains(
                            "active"
                        )
                            ? "♥"
                            : "♡";

                }
            );

        });


    /* =========================================
       SEARCH DATES
    ========================================== */

    const pickupDate =
        document.getElementById(
            "pickupDate"
        );

    const returnDate =
        document.getElementById(
            "returnDate"
        );

    const searchRental =
        document.getElementById(
            "searchRental"
        );

    const searchMessage =
        document.getElementById(
            "searchMessage"
        );


    const today =
        new Date()
            .toISOString()
            .split("T")[0];


    pickupDate.min = today;

    returnDate.min = today;


    pickupDate.addEventListener(
        "change",
        () => {

            returnDate.min =
                pickupDate.value;

        }
    );


    searchRental.addEventListener(
        "click",
        () => {

            if (
                !pickupDate.value ||
                !returnDate.value
            ) {

                searchMessage.textContent =
                    "Please select both pick-up and return dates.";

                return;

            }


            const start =
                new Date(
                    pickupDate.value
                );


            const end =
                new Date(
                    returnDate.value
                );


            if (end <= start) {

                searchMessage.textContent =
                    "Return date must be after the pick-up date.";

                return;

            }


            const days =
                Math.ceil(
                    (
                        end - start
                    ) /
                    (
                        1000 *
                        60 *
                        60 *
                        24
                    )
                );


            searchMessage.textContent =
                `Great! Your rental period is ${days} day${days > 1 ? "s" : ""}. Choose a vehicle below.`;

            document
                .getElementById(
                    "rentalFleet"
                )
                .scrollIntoView({
                    behavior: "smooth"
                });

        }
    );


    /* =========================================
       MODAL
    ========================================== */

    const rentalModal =
        document.getElementById(
            "rentalModal"
        );

    const rentalModalClose =
        document.getElementById(
            "rentalModalClose"
        );


    const modalImage =
        document.getElementById(
            "modalRentalImage"
        );

    const modalBrand =
        document.getElementById(
            "modalRentalBrand"
        );

    const modalName =
        document.getElementById(
            "modalRentalName"
        );

    const modalPrice =
        document.getElementById(
            "modalRentalPrice"
        );


    document
        .querySelectorAll(".view-rental")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const card =
                        button.closest(
                            ".rental-card"
                        );


                    selectedRental = card;


                    const image =
                        card.querySelector(
                            ".rental-image img"
                        );


                    modalImage.src =
                        image.src;

                    modalImage.alt =
                        image.alt;


                    modalBrand.textContent =
                        card.querySelector(
                            ".rental-brand"
                        ).textContent;


                    modalName.textContent =
                        card.dataset.name;


                    modalPrice.textContent =
                        `₦${Number(
                            card.dataset.price
                        ).toLocaleString()}`;


                    rentalModal.classList.add(
                        "active"
                    );


                    document.body.style.overflow =
                        "hidden";

                }
            );

        });


    function closeRentalModal() {

        rentalModal.classList.remove(
            "active"
        );

        document.body.style.overflow =
            "";

    }


    rentalModalClose.addEventListener(
        "click",
        closeRentalModal
    );


    rentalModal.addEventListener(
        "click",
        event => {

            if (
                event.target === rentalModal
            ) {

                closeRentalModal();

            }

        }
    );


    /* =========================================
       RENTAL CART
    ========================================== */

    const rentalCart =
        document.getElementById(
            "rentalCart"
        );

    const openRentalCart =
        document.getElementById(
            "openRentalCart"
        );

    const closeRentalCart =
        document.getElementById(
            "closeRentalCart"
        );

    const rentalCartBody =
        document.getElementById(
            "rentalCartBody"
        );

    const rentalCartCount =
        document.getElementById(
            "rentalCartCount"
        );

    const rentalDays =
        document.getElementById(
            "rentalDays"
        );

    const rentalTotal =
        document.getElementById(
            "rentalTotal"
        );

    const confirmRental =
        document.getElementById(
            "confirmRental"
        );


    /* =========================================
       BOOK CAR
    ========================================== */

    document
        .getElementById("bookRental")
        .addEventListener(
            "click",
            () => {

                if (!selectedRental) {
                    return;
                }


                const start =
                    pickupDate.value;

                const end =
                    returnDate.value;


                if (!start || !end) {

                    closeRentalModal();


                    document
                        .getElementById(
                            "rentalFleet"
                        )
                        .scrollIntoView({
                            behavior: "smooth"
                        });


                    searchMessage.textContent =
                        "Please select your rental dates before booking a car.";

                    return;

                }


                if (
                    new Date(end) <=
                    new Date(start)
                ) {

                    closeRentalModal();

                    searchMessage.textContent =
                        "Please choose a valid return date.";

                    return;

                }


                const days =
                    Math.ceil(
                        (
                            new Date(end) -
                            new Date(start)
                        ) /
                        (
                            1000 *
                            60 *
                            60 *
                            24
                        )
                    );


                rentalBooking = {

                    name:
                        selectedRental.dataset.name,

                    price:
                        Number(
                            selectedRental.dataset.price
                        ),

                    image:
                        selectedRental
                            .querySelector(
                                ".rental-image img"
                            )
                            .src,

                    days: days

                };


                closeRentalModal();

                renderRentalCart();

                rentalCart.classList.add(
                    "active"
                );

            }
        );


    /* =========================================
       CART RENDER
    ========================================== */

    function renderRentalCart() {

        if (!rentalBooking) {

            rentalCartBody.innerHTML = `

                <div class="empty-cart-message">

                    <div>🚗</div>

                    <p>
                        No vehicle selected.
                    </p>

                </div>

            `;


            rentalCartCount.textContent =
                "0";


            rentalDays.textContent =
                "0 days";


            rentalTotal.textContent =
                "₦0";


            confirmRental.disabled =
                true;


            return;

        }


        const total =
            rentalBooking.price *
            rentalBooking.days;


        rentalCartBody.innerHTML = `

            <div class="rental-cart-item">

                <div class="rental-cart-item-top">

                    <img
                        src="${rentalBooking.image}"
                        alt="${rentalBooking.name}"
                    >

                    <div class="rental-cart-item-info">

                        <strong>
                            ${rentalBooking.name}
                        </strong>

                        <span>
                            ₦${rentalBooking.price.toLocaleString()} / day
                        </span>

                    </div>

                    <button
                        class="remove-rental"
                        id="removeRental"
                    >
                        ×
                    </button>

                </div>


                <div class="duration-control">

                    <button
                        id="minusDay"
                    >
                        −
                    </button>

                    <strong>
                        ${rentalBooking.days} days
                    </strong>

                    <button
                        id="plusDay"
                    >
                        +
                    </button>

                </div>

            </div>

        `;


        rentalCartCount.textContent =
            "1";


        rentalDays.textContent =
            `${rentalBooking.days} day${rentalBooking.days > 1 ? "s" : ""}`;


        rentalTotal.textContent =
            `₦${total.toLocaleString()}`;


        confirmRental.disabled =
            false;


        document
            .getElementById("minusDay")
            .addEventListener(
                "click",
                () => {

                    if (
                        rentalBooking.days > 1
                    ) {

                        rentalBooking.days--;

                        renderRentalCart();

                    }

                }
            );


        document
            .getElementById("plusDay")
            .addEventListener(
                "click",
                () => {

                    rentalBooking.days++;

                    renderRentalCart();

                }
            );


        document
            .getElementById("removeRental")
            .addEventListener(
                "click",
                () => {

                    rentalBooking = null;

                    renderRentalCart();

                }
            );

    }


    /* =========================================
       OPEN / CLOSE CART
    ========================================== */

    openRentalCart.addEventListener(
        "click",
        () => {

            rentalCart.classList.add(
                "active"
            );

        }
    );


    closeRentalCart.addEventListener(
        "click",
        () => {

            rentalCart.classList.remove(
                "active"
            );

        }
    );


    /* =========================================
       CONFIRM BOOKING
    ========================================== */

    const bookingSuccess =
        document.getElementById(
            "bookingSuccess"
        );


    confirmRental.addEventListener(
        "click",
        () => {

            if (!rentalBooking) {
                return;
            }


            rentalCart.classList.remove(
                "active"
            );


            bookingSuccess.classList.add(
                "active"
            );


            rentalBooking = null;

            renderRentalCart();

        }
    );


    document
        .getElementById("closeSuccess")
        .addEventListener(
            "click",
            () => {

                bookingSuccess.classList.remove(
                    "active"
                );

            }
        );


    /* =========================================
       SCROLL ANIMATION
    ========================================== */

    const revealElements =
        document.querySelectorAll(
            ".reveal"
        );


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "visible"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                threshold: .15
            }
        );


    revealElements.forEach(
        element => {

            observer.observe(element);

        }
    );


    /* =========================================
       ESCAPE KEY
    ========================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape"
            ) {

                closeRentalModal();

                rentalCart.classList.remove(
                    "active"
                );

                bookingSuccess.classList.remove(
                    "active"
                );

            }

        }
    );


    /* =========================================
       INITIALIZE
    ========================================== */

    filterRentals();

});








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