function initializePage() {
    const darkModeToggle = document.querySelector("#darkModeToggle");
    darkModeToggle?.setAttribute(
        "aria-pressed",
        String(document.documentElement.classList.contains("dark")),
    );
    darkModeToggle?.addEventListener("click", () => {
        const isDark = document.documentElement.classList.toggle("dark");
        darkModeToggle.setAttribute("aria-pressed", String(isDark));
    });

    document.querySelector("#contactForm")?.addEventListener("submit", (event) => {
        event.preventDefault();
        alert(
            "Thanks for your message! The form is not connected to a backend yet.",
        );
    });

    const { gsap, ScrollTrigger } = window;
    if (!gsap || !ScrollTrigger) return;

    gsap.registerPlugin(ScrollTrigger);

    const introTimeline = gsap.timeline({
        defaults: {
            duration: 0.8,
            ease: "power2.out",
        },
    });

    introTimeline
        .from("#heroTitle", {
            y: -40,
            opacity: 0,
        })
        .from(
            "nav a",
            {
                y: -20,
                opacity: 0,
                stagger: 0.15,
            },
            "-=0.4",
        );

    document
        .querySelector("#replayBtn")
        ?.addEventListener("click", () => introTimeline.restart());

    gsap.utils.toArray(".reveal").forEach((section) => {
        gsap.from(section, {
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
                trigger: section,
                start: "top 80%",
                toggleActions: "play none none reverse",
            },
        });
    });

    if (document.querySelector("#progressBar")) {
        gsap.fromTo(
            "#progressBar",
            { scaleX: 0 },
            {
                scaleX: 1,
                ease: "none",
                scrollTrigger: {
                    trigger: document.documentElement,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: true,
                },
            },
        );
    }

    ScrollTrigger.matchMedia({
        "(min-width: 768px)": () => {
            gsap.utils
                .toArray("#projects, #about, #services, #contact")
                .forEach((section) => {
                    ScrollTrigger.create({
                        trigger: section,
                        start: "top top",
                        end: "+=300",
                        pin: true,
                        pinSpacing: true,
                    });
                });
        },
    });
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializePage, { once: true });
} else {
    initializePage();
}
