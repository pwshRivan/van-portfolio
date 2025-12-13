import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export const useLenis = () => {
  useEffect(() => {
    // Inisialisasi Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    // Expose ke window agar bisa diakses komponen lain
    window.lenis = lenis;

    // Sinkronisasi Lenis dan ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Gunakan GSAP ticker untuk Lenis raf agar sinkron
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // Nonaktifkan lag smoothing untuk scroll yang lebih halus
    gsap.ticker.lagSmoothing(0);

    // Bersihkan saat unmount
    return () => {
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
      lenis.destroy();
      window.lenis = null;
    };
  }, []);
};
