<template>
  <div>
    <div class="navbar">
      <router-link to="#" class="menu-bars">
        <MenuSharp @click="toggleSidebar" />
      </router-link>
      <img src="@/assets/logo-martins.png" class="logo" />
    </div>
    <Backdrop v-if="sidebar" @click="toggleSidebar" />
    <nav :class="['nav-menu', { active: sidebar }]">
      <ul class="nav-menu-items">
        <span class="nome-usuario">Boas vindas, {{ nomeUsuario }}</span>
        <li class="navbar-toggle">
          <div class="menu-bars">
            <CloseSharp @click="toggleSidebar" />
          </div>
        </li>
        <div class="area-navegacao">
          <div v-for="(item, index) in SidebarData" :key="index">
            <li v-if="item.subMenu" class="nav-text" @click="toggleSubMenu(index)">
              <span>{{ item.title }}</span>
              <FaCaretUp v-if="subMenuOpen[index]" class="submenu-icon" />
              <FaCaretDown v-else class="submenu-icon" />
            </li>
            <router-link v-else :to="item.path" class="nav-text">
              <li class="nav-text">
                <span>{{ item.title }}</span>
              </li>
            </router-link>
            <ul v-if="item.subMenu" v-show="subMenuOpen[index]" class="submenu">
              <router-link
                v-for="(subItem, subIndex) in item.subMenu"
                :key="subIndex"
                :to="subItem.path"
              >
                <li class="submenu-item">
                  <span>{{ subItem.title }}</span>
                </li>
              </router-link>
            </ul>
          </div>
        </div>
      </ul>
    </nav>
  </div>
</template>

<script>
import { ref } from 'vue';
import { SidebarData } from './SidebarData';
import Backdrop from '@/components/modal/backdrop/Backdrop.vue';
import MenuSharp from '@mui/icons-material/MenuSharp';
import CloseSharp from '@mui/icons-material/CloseSharp';
import { FaCaretUp, FaCaretDown } from 'react-icons/fa';

export default {
  props: {
    nomeUsuario: String
  },
  components: {
    Backdrop,
    MenuSharp,
    CloseSharp,
    FaCaretUp,
    FaCaretDown
  },
  setup() {
    const sidebar = ref(false);
    const subMenuOpen = ref({});

    const toggleSidebar = () => {
      sidebar.value = !sidebar.value;
    };

    const toggleSubMenu = (index) => {
      subMenuOpen.value = {
        ...subMenuOpen.value,
        [index]: !subMenuOpen.value[index]
      };
    };

    return {
      sidebar,
      subMenuOpen,
      toggleSidebar,
      toggleSubMenu,
      SidebarData
    };
  }
};
</script>

<style scoped>
.navbar {
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #08213e;
  height: 6.5vh;
  z-index: 100;
  justify-content: start;
  align-items: center;
}

.menu-bars {
  color: white;
  margin: 1.2vh 0 0 1.3vw;
  font-size: 1.8rem;
  background: none;
}

.navbar-toggle {
  position: absolute;
  top: 0.45vh;
  left: 14.2vw;
  width: 18%;
  height: 5vh;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.nome-usuario {
  position: relative;
  top: 1.1vh;
  color: white;
}

.nav-menu {
  background-color: #00346e;
  width: 19vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: -100%;
  transition: 750ms;
  z-index: 1000;
}

.nav-menu.active {
  left: 0;
  transition: 250ms;
}

.nav-text {
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 2vh 1vw 0.5vh 0.1vw;
  list-style: none;
  height: 4.3vh;
  gap: 0.5vw;
}

.nav-text span {
  color: #f5f5f5;
  font-size: 1.1rem;
  font-weight: 450;
  cursor: pointer;
}

.nav-text:hover {
  background-color: #302b31a5;
}

.area-navegacao {
  display: flex;
  flex-direction: column;
  padding: 0 0 0 1.5vw;
  margin: 1.8vh 0 0;
  width: 16.7vw;
  gap: 0.7vh;
}

.submenu {
  list-style-type: none;
  border-left: 2.3px solid rgba(255, 255, 255, 0.125);
}

.submenu-item {
  padding: 2.3vh 0.5vw;
  cursor: default;
}

.submenu-item:hover {
  background-color: #302b31a5;
}
</style>
