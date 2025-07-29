<template>
  <div class="navbar-container">
    <div class="search-wrapper">
      <SearchBar />
    </div>

    <div class="logo-wrapper">
      <div class="meddon-capital">æ</div>
      <div class="meddon-lowercase">ther</div>
    </div>

    <div class="about-button-wrapper">
      <button
        type="button"
        class="nav-btn"
        :class="$q.screen.gt.sm ? 'desktop' : 'mobile'"
        @click="handleOpenInfo"
      >
        <template v-if="$q.screen.gt.sm">About</template
        ><i v-else class="pi pi-info-circle icon"></i>
      </button>
    </div>
  </div>
  <div class="about-popup">
    <template v-if="isAboutOpen">
      <div class="close-wrapper">
        <button type="button" class="close-button flex-center" @click="handleCloseInfo">
          <i class="pi pi-times icon"></i>
        </button>
      </div>
      <div v-if="$q.screen.lt.md" class="logo-wrapper">
        <div class="meddon-capital">æ</div>
        <div class="meddon-lowercase">ther</div>
      </div>
      <div class="about-text-wrapper">
        <p>{{ aboutText[0] }}</p>
        <p>{{ aboutText[1] }}</p>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useQuasar } from "quasar";
import SearchBar from "./SearchBar.vue";
import gsap from "gsap";
import { useSearchStore } from "src/stores/search-store";
import { computed, ref, watch, onMounted, nextTick } from "vue";
import { aboutText } from "./about-text";

const searchStore = useSearchStore();
const $q = useQuasar();
const emit = defineEmits(["openPopup", "closePopup"]);
const isAboutOpen = ref(true);
const aboutPopupFullHeight = ref(0);

const aboutPopupFullWidth = computed(() => {
  if ($q.screen.lt.md) {
    return "92vw";
  } else if ($q.screen.md) {
    return "340px";
  } else {
    return "420px";
  }
});

onMounted(async () => {
  await nextTick();
  const popup = document.querySelector(".about-popup") as HTMLElement;
  console.log(popup.offsetHeight);
  aboutPopupFullHeight.value = popup.offsetHeight;
});

function hideLogo() {
  gsap.to(".logo-wrapper", {
    duration: 0.2,
    opacity: 0,
    ease: "power2.out",
  });
}

function showLogo(delay: number) {
  gsap.to(".logo-wrapper", {
    duration: 0.2,
    opacity: 1,
    ease: "power2.out",
    delay,
  });
}

function handleOpenSearch() {
  hideLogo();

  gsap.to(".nav-btn", {
    duration: 0.2,
    opacity: 0,
    ease: "power2.out",
  });
}

function handleCloseSearch() {
  showLogo(0.3);

  gsap.to(".nav-btn", {
    duration: 0.2,
    opacity: 1,
    ease: "power2.out",
    delay: 0.3,
  });
}

function handleOpenInfo() {
  setTimeout(() => {
    isAboutOpen.value = true;
  }, 800);

  emit("openPopup");

  if ($q.screen.lt.md) {
    hideLogo();

    gsap.to(".search-wrapper", {
      duration: 0.2,
      opacity: 0,
      ease: "power2.out",
    });
  }

  gsap.to(".about-popup", {
    duration: 0.1,
    opacity: 1,
    ease: "power2.out",
    delay: 0.2,
  });

  gsap.to(".about-popup", {
    duration: 0.3,
    width: aboutPopupFullWidth.value,
    ease: "power2.out",
    delay: 0.3,
  });

  gsap.to(".about-popup", {
    duration: 0.4,
    height: aboutPopupFullHeight.value + "px",
    ease: "power2.out",
    delay: 0.45,
  });
}

function handleCloseInfo() {
  isAboutOpen.value = false;
  emit("closePopup");

  if ($q.screen.lt.md) {
    showLogo(0.5);

    gsap.to(".search-wrapper", {
      duration: 0.2,
      opacity: 1,
      ease: "power2.out",
      delay: 0.4,
    });
  }

  const width = $q.screen.gt.sm ? "140px" : "44px";
  const height = $q.screen.gt.sm ? "56px" : "44px";

  gsap.to(".about-popup", {
    duration: 0.1,
    ease: "power2.out",
    delay: 0.45,
  });

  gsap.to(".about-popup", {
    duration: 0.2,
    width,
    opacity: 0,
    ease: "power2.out",
    delay: 0.3,
  });

  gsap.to(".about-popup", {
    duration: 0.3,
    height,
    ease: "power2.out",
  });
}

function setInfoWidth(isDesktop: boolean) {
  gsap.to(".about-popup", {
    duration: 0.2,
    width: aboutPopupFullWidth.value,
    ease: "power2.out",
  });

  if (isDesktop) {
    showLogo(0.5);

    gsap.to(".search-wrapper", {
      duration: 0.2,
      opacity: 1,
      ease: "power2.out",
      delay: 0.4,
    });
  } else {
    hideLogo();

    gsap.to(".search-wrapper", {
      duration: 0.2,
      opacity: 0,
      ease: "power2.out",
    });
  }
}

watch(
  () => $q.screen.gt.sm,
  (isDesktop) => {
    if (isDesktop) {
      handleCloseSearch();
    } else if (searchStore.isSearchOpen) {
      handleOpenSearch();
    }

    if (isAboutOpen.value) setInfoWidth(isDesktop);
  },
);

watch(
  () => searchStore.isSearchOpen,
  (isOpen) => {
    if ($q.screen.gt.sm) return;

    if (isOpen) {
      handleOpenSearch();
    } else {
      handleCloseSearch();
    }
  },
);

watch(aboutPopupFullHeight, (value) => {
  if (value) {
    const width = $q.screen.gt.sm ? "140px" : "44px";
    const height = $q.screen.gt.sm ? "56px" : "44px";

    gsap.set(".about-popup", {
      width,
      height,
    });

    isAboutOpen.value = false;

    const popup = document.querySelector(".about-popup") as HTMLElement;
    console.log(popup.offsetHeight);
  }
});
</script>

<style scoped lang="scss">
button.nav-btn {
  border: 0;
  color: $deep-blue;
  background: rgba(255, 255, 255, 0.7);
  box-shadow: 0 2px 24px 0 rgba(83, 15, 148, 0.3);
  border-radius: 2px;
  pointer-events: auto;
  display: flex;
  align-items: center;
  justify-content: center;
}

button.desktop {
  font-size: 16px;
  font-weight: 700;
  text-transform: uppercase;
  // font-style: italic;
  padding: 0 32px;
  width: 140px;
  height: 56px;
}

button.mobile {
  width: 44px;
  height: 44px;

  i {
    font-size: 20px;
  }
}

.close-wrapper {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}

.navbar-container {
  z-index: 200000;
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100px;
  padding: 0 4vw;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
  pointer-events: none;
}

.logo-wrapper {
  transform: translateY(7px);
  display: flex;
  justify-content: center;
}

.meddon-capital {
  text-transform: uppercase;
  font-family: "Meddon", cursive;
  font-size: 56px;
  transform: translate(8px, 8px);
  margin: 0;
}

.meddon-lowercase {
  font-family: "Meddon", cursive;
  font-size: 56px;
  transform: translateX(-9px);
  margin: 0;
}

.search-wrapper {
  justify-self: start;
}

.about-popup {
  position: absolute;
  top: 22px;
  right: 4vw;
  width: v-bind(aboutPopupFullWidth);
  // height: 56px;
  background: white;
  box-shadow: 0 2px 24px 0 rgba(83, 15, 148, 0.3);
  opacity: 0;
  border-radius: 2px;
  z-index: 500000;
  padding: 8px 16px 32px 16px;
  pointer-events: none;
}

.about-button-wrapper {
  justify-self: end;
  //background: red;
}

.close-button {
  pointer-events: auto;
}

body.screen--sm,
body.screen--xs {
  .about-popup {
    width: 44px;
    // height: 44px;
    top: 28px;
  }

  .logo-wrapper {
    transform: translateY(4px);
  }

  .about-text-wrapper {
    margin-top: 16px;
  }

  .meddon-capital {
    text-transform: uppercase;
    font-family: "Meddon", cursive;
    font-size: 36px;
    transform: translate(5px, 5px);
    margin: 0;
  }

  .meddon-lowercase {
    font-family: "Meddon", cursive;
    font-size: 36px;
    transform: translateX(-6px);
    margin: 0;
  }
}
</style>
