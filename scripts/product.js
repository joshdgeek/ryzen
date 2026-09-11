document.addEventListener("DOMContentLoaded", () => {

    const productGrid = document.getElementById("product-grid");

    const categoryButtons =
        document.querySelectorAll(".category-btn");

    let products = [];


    /*
    ============================================================
    LOAD PRODUCTS
    ============================================================
    */

    async function loadProducts() {

        try {

            const response =
                await fetch("./scripts/products.json");

            if (!response.ok) {
                throw new Error(
                    "Could not load products.json"
                );
            }

            const data =
                await response.json();

            products = data.products || [];


            /*
            Initial state:
            ONLY render the first 5 products
            */

            renderProducts(
                products.slice(0, 5)
            );


        } catch (error) {

            console.error(
                "Product loading error:",
                error
            );

            productGrid.innerHTML = `
                <div class="col-span-full py-12 text-center">
                    <p class="text-sm text-gray-500">
                        Unable to load products.
                    </p>
                </div>
            `;

        }

    }


    /*
    ============================================================
    FORMAT NAIRA
    ============================================================
    */

    function formatNaira(amount) {

        return new Intl.NumberFormat("en-NG", {
            style: "currency",
            currency: "NGN",
            maximumFractionDigits: 0
        }).format(amount);

    }


    /*
    ============================================================
    PRODUCT TYPE LABEL
    ============================================================
    */

    function getProductType(product) {

        switch (product.type) {

            case "wallet":
                return "Gift Card";

            case "subscription":
                return "Subscription";

            case "game":
                return "Game";

            default:
                return "Digital";

        }

    }


    /*
    ============================================================
    CREATE ONE PRODUCT CARD
    ============================================================

    This function ONLY creates the HTML for ONE product.

    It does not decide which products should be displayed.
    ============================================================
    */

    function createProductCard(product) {

        return `

            <article
                class="group overflow-hidden
                       rounded-2xl
                       border border-white/10
                       bg-white/[0.02]
                       transition
                       hover:-translate-y-1
                       hover:border-white/20"
            >

                <!-- Product image -->

                <div
                    class="relative aspect-[4/3]
                           overflow-hidden
                           bg-white/[0.04]"
                >

                    <img
                        src="${product.image_href}"
                        alt="${product.title}"
                        loading="lazy"
                        class="h-full w-full
                               object-cover
                               transition
                               duration-300
                               group-hover:scale-105"
                        onerror="this.style.display='none'"
                    >


                    <!-- Region -->

                    <span
                        class="absolute left-3 top-3
                               rounded-md
                               bg-black/60
                               px-2 py-1
                               text-[10px]
                               font-bold
                               uppercase
                               text-gray-300"
                    >
                        ${product.region}
                    </span>


                    <!-- Product type -->

                    <span
                        class="absolute right-3 top-3
                               rounded-md
                               bg-black/60
                               px-2 py-1
                               text-[10px]
                               font-bold
                               uppercase
                               text-gray-400"
                    >
                        ${getProductType(product)}
                    </span>

                </div>


                <!-- Product information -->

                <div class="p-4">


                    <!-- Platform -->

                    <p
                        class="text-[10px]
                               font-semibold
                               uppercase
                               tracking-widest
                               text-gray-600"
                    >
                        ${product.platform}
                    </p>


                    <!-- Product title -->

                    <h3
                        class="mt-1 line-clamp-2
                               min-h-[2.5rem]
                               text-sm
                               font-bold
                               leading-5"
                    >
                        ${product.title}
                    </h3>


                    <!-- Bottom row -->

                    <div
                        class="mt-4
                               flex items-end
                               justify-between
                               gap-2"
                    >

                        <div>

                            <p
                                class="text-[10px]
                                       text-gray-600"
                            >
                                Price
                            </p>

                            <p
                                class="mt-0.5
                                       text-[13px]
                                       font-black"
                            >
                                ${formatNaira(product.amount * 1310)} - ${formatNaira(product.amount * 1350)}
                            </p>

                        </div>


                        <!-- Buy -->

                        <button
                            type="button"
                            class="buy-product
                                   flex h-9
                                   items-center
                                   justify-center
                                   rounded-lg
                                   bg-white
                                   px-3
                                   text-xs
                                   font-bold
                                   text-black
                                   transition
                                   hover:bg-gray-200"
                            data-product-id="${product.id}" target="_blank" rel="${product.href}" onclick="window.open('${product.href}', '_blank')"
                        >
                            Buy
                        </button>

                    </div>

                </div>

            </article>

        `;

    }


    /*
    ============================================================
    RENDER PRODUCTS
    ============================================================

    This function receives an ARRAY of products
    and renders all of them into the grid.
    ============================================================
    */

    function renderProducts(productList) {

        if (!productList.length) {

            productGrid.innerHTML = `
                <div class="col-span-full py-12 text-center">

                    <p class="text-sm text-gray-500">
                        No products found.
                    </p>

                </div>
            `;

            return;
        }


        productGrid.innerHTML =
            productList
                .map(product => createProductCard(product))
                .join("");


        attachBuyButtons();

    }


    /*
    ============================================================
    RENDER BY CATEGORY
    ============================================================

    This is the important function.

    "all"
        -> first 5 products

    "PlayStation"
        -> ALL PlayStation products

    "Steam"
        -> ALL Steam products
    ============================================================
    */

    function renderByCategory(category) {

        if (category === "all") {

            renderProducts(
                products.slice(0, 5)
            );

            return;
        }


        const filteredProducts =
            products.filter(product =>
                product.platform.toLowerCase() ===
                category.toLowerCase()
            );


        renderProducts(filteredProducts);

    }


    /*
    ============================================================
    CATEGORY BUTTONS
    ============================================================
    */

    categoryButtons.forEach(button => {

        button.addEventListener("click", () => {

            const category =
                button.dataset.category;
            console.log(
                "Category selected:",
                category
            );


            /*
            Update active button
            */

            categoryButtons.forEach(btn => {

                btn.classList.remove(
                    "bg-white",
                    "text-black",
                    "font-semibold"
                );

                btn.classList.add(
                    "border",
                    "border-white/10",
                    "text-gray-400",
                    "font-medium"
                );

            });


            /*
            Make clicked button active
            */

            button.classList.remove(
                "border",
                "border-white/10",
                "text-gray-400",
                "font-medium"
            );

            button.classList.add(
                "bg-white",
                "text-black",
                "font-semibold"
            );


            /*
            Render the appropriate products
            */

            renderByCategory(category);

        });

    });


    /*
    ============================================================
    BUY BUTTONS
    ============================================================
    */

    function attachBuyButtons() {

        const buyButtons =
            document.querySelectorAll(
                ".buy-product"
            );


        buyButtons.forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const productId =
                        button.dataset.productId;


                    const product =
                        products.find(
                            item =>
                                item.id === productId
                        );


                    if (!product) {
                        return;
                    }


                    handleProductPurchase(product);

                }
            );

        });

    }


    /*
    ============================================================
    PURCHASE HANDLER
    ============================================================
    */

    function handleProductPurchase(product) {

        console.log(
            "Product selected:",
            product
        );


        /*
        ========================================================
        PLACEHOLDER

        Later this is where we'll add:

        - Eneba affiliate URL
        - Product-specific redirect
        - Click tracking
        - Cart
        - Checkout
        - etc.
        ========================================================
        */

    }


    /*
    ============================================================
    START APPLICATION
    ============================================================
    */

    loadProducts();

});