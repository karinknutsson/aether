<template>
  <div class="navbar-container">
    <div class="search-wrapper">
      <SearchBar />
    </div>

    <div class="logo-wrapper">
      <div class="meddon-capital">æ</div>
      <div class="meddon-lowercase">ther</div>
    </div>

    <div class="about-wrapper">
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

    <div class="about-popup">
      <template v-if="isAboutOpen">
        <div class="close-wrapper">
          <button type="button" class="close-button flex-center" @click="handleCloseInfo">
            <i class="pi pi-times icon"></i>
          </button>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { is, useQuasar } from "quasar";
import SearchBar from "./SearchBar.vue";
import gsap from "gsap";
import { useSearchStore } from "src/stores/search-store";
import { ref, watch } from "vue";

const searchStore = useSearchStore();
const $q = useQuasar();
const emit = defineEmits(["openPopup", "closePopup"]);
const isAboutOpen = ref(false);

function hideLogo() {
  gsap.to(".logo-wrapper", {
    duration: 0.2,
    opacity: 0,
    ease: "power2.out",
  });
}

function showLogo() {
  gsap.to(".logo-wrapper", {
    duration: 0.2,
    opacity: 1,
    ease: "power2.out",
    delay: 0.3,
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
  showLogo();

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
  hideLogo();

  gsap.to(".search-wrapper", {
    duration: 0.2,
    opacity: 0,
    ease: "power2.out",
  });

  gsap.to(".about-popup", {
    duration: 0.1,
    opacity: 1,
    ease: "power2.out",
    delay: 0.2,
  });

  gsap.to(".about-popup", {
    duration: 0.3,
    width: "92vw",
    ease: "power2.out",
    delay: 0.3,
  });

  gsap.to(".about-popup", {
    duration: 0.4,
    height: "80vh",
    ease: "power2.out",
    delay: 0.45,
  });
}

function handleCloseInfo() {
  isAboutOpen.value = false;
  emit("closePopup");
  showLogo();

  gsap.to(".search-wrapper", {
    duration: 0.2,
    opacity: 1,
    ease: "power2.out",
    delay: 0.3,
  });

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

watch(
  () => $q.screen.gt.sm,
  (isDesktop) => {
    if (isDesktop) {
      handleCloseSearch();
    } else if (searchStore.isSearchOpen) {
      handleOpenSearch();
    }
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
  padding: 8px;
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
  position: fixed;
  top: 22px;
  right: 4vw;
  width: 140px;
  height: 56px;
  background: white;
  box-shadow: 0 2px 24px 0 rgba(83, 15, 148, 0.3);
  opacity: 0;
  border-radius: 2px;
  z-index: 50000;
}

.about-wrapper {
  justify-self: end;
  // background: red;
}

.close-button {
  pointer-events: auto;
}

body.screen--sm,
body.screen--xs {
  .about-popup {
    width: 44px;
    height: 44px;
    top: 28px;
  }

  .logo-wrapper {
    transform: translateY(4px);
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
