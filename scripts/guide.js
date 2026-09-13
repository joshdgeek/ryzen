
function renderEnebaGuide() {

    const container = document.getElementById("eneba-guide");

    if (!container) return;

    container.innerHTML = `
        <div class="w-full rounded-xl border border-gray-200 bg-white shadow-sm">

            <!-- Dropdown button -->
            <button
                id="eneba-guide-toggle"
                type="button"
                class="w-full flex items-center justify-between px-5 py-4 text-left"
            >

                <div>
                    <h2 class="font-semibold text-gray-900">
                        How to get your card
                    </h2>

                    <p class="text-sm text-gray-500 mt-1">
                        New to Eneba? Follow these 3 simple steps.
                    </p>
                </div>

                <svg
                    id="eneba-guide-chevron"
                    class="w-5 h-5 text-gray-500 transition-transform duration-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M19 9l-7 7-7-7"
                    />
                </svg>

            </button>


            <!-- Dropdown content -->
            <div
                id="eneba-guide-content"
                class="hidden border-t border-gray-100 px-5 py-5"
            >

                <div class="space-y-5">

                    <!-- Step 1 -->
                    <div class="flex gap-4">

                        <div class="flex-shrink-0 flex items-center justify-center
                                    w-8 h-8 rounded-full bg-gray-900 text-white
                                    text-sm font-bold">
                            1
                        </div>

                        <div>
                            <h3 class="font-semibold text-gray-900">
                                Create an Eneba account
                            </h3>

                            <p class="mt-1 text-sm text-gray-600">
                                Register and verify your email on Eneba.
                            </p>

                            <a
                                href="https://my.eneba.com/registration?ref=%2F"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="inline-block mt-2 text-sm font-semibold
                                       text-indigo-600 hover:text-indigo-700"
                            >
                                Register on Eneba →
                            </a>
                        </div>

                    </div>


                    <!-- Step 2 -->
                    <div class="flex gap-4">

                        <div class="flex-shrink-0 flex items-center justify-center
                                    w-8 h-8 rounded-full bg-gray-900 text-white
                                    text-sm font-bold">
                            2
                        </div>

                        <div>
                            <h3 class="font-semibold text-gray-900">
                                Come back and choose your card
                            </h3>

                            <p class="mt-1 text-sm text-gray-600">
                                Return to this page and select the card or game
                                you want to purchase.
                            </p>
                        </div>

                    </div>


                    <!-- Step 3 -->
                    <div class="flex gap-4">

                        <div class="flex-shrink-0 flex items-center justify-center
                                    w-8 h-8 rounded-full bg-gray-900 text-white
                                    text-sm font-bold">
                            3
                        </div>

                        <div>
                            <h3 class="font-semibold text-gray-900">
                                Check your Eneba Library
                            </h3>

                            <p class="mt-1 text-sm text-gray-600">
                                After completing your purchase, open
                                <strong> Key Library</strong> on Eneba to reveal
                                your key.
                            </p>
                        </div>

                    </div>

                </div>

            </div>

        </div>
    `;


    // Dropdown functionality
    const toggle = document.getElementById("eneba-guide-toggle");
    const content = document.getElementById("eneba-guide-content");
    const chevron = document.getElementById("eneba-guide-chevron");

    toggle.addEventListener("click", () => {

        content.classList.toggle("hidden");

        chevron.classList.toggle("rotate-180");

    });

}


// Render guide when page loads
document.addEventListener("DOMContentLoaded", renderEnebaGuide);

