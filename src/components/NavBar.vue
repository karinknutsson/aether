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
      <button v-if="$q.screen.gt.sm" class="nav-btn desktop" @click="emit('openPopup')">
        About
      </button>
      <button v-else class="nav-btn mobile" @click="emit('openPopup')">
        <i class="pi pi-info-circle icon"></i>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useQuasar } from "quasar";
import SearchBar from "./SearchBar.vue";
import gsap from "gsap";
import { useSearchStore } from "src/stores/search-store";
import { watch } from "vue";

const searchStore = useSearchStore();
const $q = useQuasar();
const emit = defineEmits(["openPopup", "closePopup"]);

function handleOpenSearch() {
  gsap.to(".logo-wrapper", {
    duration: 0.2,
    opacity: 0,
    ease: "power2.out",
  });

  gsap.to(".nav-btn", {
    duration: 0.2,
    opacity: 0,
    ease: "power2.out",
  });
}

function handleCloseSearch() {
  gsap.to(".logo-wrapper", {
    duration: 0.2,
    opacity: 1,
    ease: "power2.out",
    delay: 0.3,
  });

  gsap.to(".nav-btn", {
    duration: 0.2,
    opacity: 1,
    ease: "power2.out",
    delay: 0.3,
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

.about-wrapper {
  justify-self: end;
}

body.screen--sm,
body.screen--xs {
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
