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
    ========================================= */

    const cards =
        [...document.querySelectorAll(".car-card")];

    const search =
        document.getElementById("carSearch");

    const typeFilter =
        document.getElementById("typeFilter");

    const priceFilter =
        document.getElementById("priceFilter");

    const brandButtons =
        document.querySelectorAll(
            ".brands-list button"
        );

    const carCount =
        document.getElementById("carCount");

    const noCars =
        document.getElementById("noCars");


    let selectedBrand = "all";


    /* =========================================
       FILTER
    ========================================= */

    function filterCars() {

        const searchValue =
            search.value.toLowerCase().trim();

        const selectedType =
            typeFilter.value;


        let visibleCards = cards.filter(card => {

            const name =
                card.dataset.name.toLowerCase();

            const brand =
                card.dataset.brand;

            const type =
                card.dataset.type;


            const matchesSearch =
                name.includes(searchValue) ||
                brand.toLowerCase()
                    .includes(searchValue);


            const matchesBrand =
                selectedBrand === "all" ||
                brand === selectedBrand;


            const matchesType =
                selectedType === "all" ||
                type === selectedType;


            const visible =
                matchesSearch &&
                matchesBrand &&
                matchesType;


            card.style.display =
                visible ? "" : "none";


            return visible;

        });


        /* =====================================
           SORT
        ===================================== */

        if (priceFilter.value !== "default") {

            visibleCards.sort((a, b) => {

                const priceA =
                    Number(a.dataset.price);

                const priceB =
                    Number(b.dataset.price);


                if (priceFilter.value === "low") {

                    return priceA - priceB;

                }

                return priceB - priceA;

            });


            const grid =
                document.getElementById(
                    "carsGrid"
                );


            visibleCards.forEach(card => {

                grid.appendChild(card);

            });

        }


        /* =====================================
           COUNTER
        ===================================== */

        carCount.textContent =
            `${visibleCards.length} Vehicles`;


        /* =====================================
           EMPTY STATE
        ===================================== */

        noCars.style.display =
            visibleCards.length === 0
                ? "block"
                : "none";

    }


    /* =========================================
       SEARCH
    ========================================= */

    search.addEventListener(
        "input",
        filterCars
    );


    typeFilter.addEventListener(
        "change",
        filterCars
    );


    priceFilter.addEventListener(
        "change",
        filterCars
    );


    /* =========================================
       BRAND FILTER
    ========================================= */

    brandButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                brandButtons.forEach(btn => {

                    btn.classList.remove(
                        "active"
                    );

                });


                button.classList.add(
                    "active"
                );


                selectedBrand =
                    button.dataset.brand;


                filterCars();

            }
        );

    });


    /* =========================================
       FAVORITES
    ========================================= */

    document
        .querySelectorAll(".favorite")
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
       MODAL
    ========================================= */

    const modal =
        document.getElementById(
            "carModal"
        );

    const modalClose =
        document.getElementById(
            "modalClose"
        );

    const modalImage =
        document.getElementById(
            "modalImage"
        );

    const modalBrand =
        document.getElementById(
            "modalBrand"
        );

    const modalName =
        document.getElementById(
            "modalName"
        );

    const modalPrice =
        document.getElementById(
            "modalPrice"
        );

    let selectedCar = null;


    document
        .querySelectorAll("[data-details]")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const card =
                        button.closest(
                            ".car-card"
                        );


                    selectedCar = card;


                    const image =
                        card.querySelector(
                            ".car-image img"
                        );


                    modalImage.src =
                        image.src;

                    modalImage.alt =
                        image.alt;


                    modalBrand.textContent =
                        card.dataset.brand;


                    modalName.textContent =
                        card.querySelector(
                            "h3"
                        ).textContent;


                    modalPrice.textContent =
                        `₦${card.dataset.price}M`;


                    modal.classList.add(
                        "active"
                    );


                    document.body.style.overflow =
                        "hidden";

                }
            );

        });


    function closeModal() {

        modal.classList.remove(
            "active"
        );

        document.body.style.overflow =
            "";

    }


    modalClose.addEventListener(
        "click",
        closeModal
    );


    modal.addEventListener(
        "click",
        event => {

            if (
                event.target === modal
            ) {

                closeModal();

            }

        }
    );


    /* =========================================
       CART
    ========================================= */

    const cartPanel =
        document.getElementById(
            "cartPanel"
        );

    const openCart =
        document.getElementById(
            "openCart"
        );

    const closeCart =
        document.getElementById(
            "closeCart"
        );

    const cartItems =
        document.getElementById(
            "cartItems"
        );

    const cartCount =
        document.getElementById(
            "cartCount"
        );

    const cartTotal =
        document.getElementById(
            "cartTotal"
        );


    let cart = [];


    /* =========================================
       ADD TO CART
    ========================================= */

    function addToCart(card) {

        const car = {

            name: card.dataset.name,

            brand: card.dataset.brand,

            price: Number(
                card.dataset.price
            ),

            image: card.querySelector(
                ".car-image img"
            ).src

        };


        const alreadyAdded =
            cart.some(
                item =>
                    item.name === car.name
            );


        if (!alreadyAdded) {

            cart.push(car);

        }


        renderCart();

        cartPanel.classList.add(
            "active"
        );

    }


    /* =========================================
       CARD CART BUTTON
    ========================================= */

    cards.forEach(card => {

        const detailsButton =
            card.querySelector(
                ".details-btn"
            );


        /* Double-click card to add */

        card.addEventListener(
            "dblclick",
            () => {

                addToCart(card);

            }
        );

    });


    /* =========================================
       MODAL CART
    ========================================= */

    document
        .getElementById("modalCart")
        .addEventListener(
            "click",
            () => {

                if (selectedCar) {

                    addToCart(
                        selectedCar
                    );

                }

            }
        );


    /* =========================================
       RENDER CART
    ========================================= */

    function renderCart() {

        cartItems.innerHTML = "";


        let total = 0;


        cart.forEach(
            (item, index) => {

                total += item.price;


                const cartItem =
                    document.createElement(
                        "div"
                    );


                cartItem.className =
                    "cart-item";


                cartItem.innerHTML = `

                    <img
                        src="${item.image}"
                        alt="${item.name}"
                    >

                    <div class="cart-item-info">

                        <strong>
                            ${item.name}
                        </strong>

                        <span>
                            ₦${item.price}M
                        </span>

                    </div>

                    <button
                        class="remove-item"
                        data-index="${index}"
                    >
                        ×
                    </button>

                `;


                cartItems.appendChild(
                    cartItem
                );

            }
        );


        cartCount.textContent =
            cart.length;


        cartTotal.textContent =
            `₦${total}M`;


        document
            .querySelectorAll(
                ".remove-item"
            )
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () => {

                        cart.splice(
                            Number(
                                button.dataset.index
                            ),
                            1
                        );


                        renderCart();

                    }
                );

            });

    }


    /* =========================================
       CART OPEN / CLOSE
    ========================================= */

    openCart.addEventListener(
        "click",
        () => {

            cartPanel.classList.add(
                "active"
            );

        }
    );


    closeCart.addEventListener(
        "click",
        () => {

            cartPanel.classList.remove(
                "active"
            );

        }
    );


    /* =========================================
       ESCAPE
    ========================================= */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape"
            ) {

                closeModal();

                cartPanel.classList.remove(
                    "active"
                );

            }

        }
    );


    /* =========================================
       SCROLL ANIMATION
    ========================================= */

    const revealElements =
        document.querySelectorAll(
            ".reveal"
        );


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

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

                });

            },
            {
                threshold: .15
            }
        );


    revealElements.forEach(element => {

        observer.observe(element);

    });


    /* =========================================
       INITIAL STATE
    ========================================= */

    brandButtons[0].classList.add(
        "active"
    );


    filterCars();

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