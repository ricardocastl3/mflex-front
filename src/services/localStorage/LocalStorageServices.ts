import { langByCookies } from "@/http/axios/api";
import { ECOOKIES } from "@/utils/enums";

class LocalStorageServices {
  keys = {
    rc_pricing: "rc-pricing",
    rc_watchTv: "rc-watch-tv",
    rc_watchMovie: "rc-watch-movie",
    rc_football: "gm_rc",
    rc_music: "rc-music",
    rc_artist_panel: "rc-art-panel",
    rc_last_page: "lst-pg",
    aff_code: "btag",
    watch_token: "wtn",
  };

  async checkRedirects() {
    return new Promise((resolv, reject) => {
      if (this.getPricingID()) {
        this.redirectForPricing();
        return;
      }

      if (this.getWatchID()) {
        this.redirectWatchTv();
        return;
      }

      if (this.getWatchMovieID()) {
        this.redirectWatchMovie();
        return;
      }

      if (this.getFootballAITeam()) {
        this.redirectFootballAITeam();
        return;
      }

      if (this.getMusicSlug()) {
        this.redirectForMusic();
        return;
      }

      if (this.getArtistPanel()) {
        this.redirectForArtistPanel();
        return;
      }

      setTimeout(() => {
        resolv(true);
      }, 500);
    });
  }

  delKey(key: string) {
    localStorage.removeItem(key);
  }

  resetAllKeys() {
    localStorage.removeItem(this.keys.rc_pricing);
    localStorage.removeItem(this.keys.rc_watchTv);
    localStorage.removeItem(this.keys.rc_watchMovie);
    localStorage.removeItem(this.keys.rc_football);
    localStorage.removeItem(this.keys.aff_code);
    localStorage.removeItem(this.keys.rc_artist_panel);
    localStorage.removeItem(this.keys.rc_music);
  }

  setKey(key: string, data: any) {
    localStorage.setItem(key, data);
  }

  getKey(key: string) {
    return localStorage.getItem(key);
  }

  // Tvs
  redirectWatchTv() {
    const id = this.getWatchID();
    this.resetAllKeys();
    window.location.href = `/${langByCookies}/flex-tv?chl=${id}`;
  }

  redirectWatchMovie() {
    const id = this.getWatchID();
    this.resetAllKeys();
    window.location.href = `/${langByCookies}/flex-movie?mv=${id}`;
  }

  redirectFootballAITeam() {
    window.location.href = `/${langByCookies}/games?gm=yes`;
  }

  redirectForPricing() {
    const id = this.getPricingID();
    this.delKey(this.keys.rc_pricing);
    window.location.href = `/${langByCookies}/pricing?sb=${id}`;
  }

  redirectForMusic() {
    const slug = this.getMusicSlug();
    this.delKey(this.keys.rc_music);
    window.location.href = `/${langByCookies}/musics/${slug}`;
  }

  redirectForArtistPanel() {
    this.delKey(this.keys.rc_artist_panel);
    window.location.href = `/${langByCookies}/app/art-musics`;
  }

  getWatchID() {
    const res = localStorage.getItem(this.keys.rc_watchTv);
    return res?.split("_")[1] || false;
  }

  getLastPeerViewFlexZone() {
    const res = localStorage.getItem(this.keys.rc_last_page);
    return res;
  }

  getArtistPanel() {
    const res = localStorage.getItem(this.keys.rc_artist_panel);
    return res?.split("_")[1] || false;
  }

  getMusicSlug() {
    const res = localStorage.getItem(this.keys.rc_music);
    return res?.split("_")[1] || false;
  }

  getFootballAITeam() {
    const res = localStorage.getItem(this.keys.rc_football);
    return res;
  }

  getWatchMovieID() {
    const res = localStorage.getItem(this.keys.rc_watchMovie);
    return res?.split("_")[1] || false;
  }

  getAffiliateCode() {
    const res = localStorage.getItem(this.keys.aff_code);
    return res;
  }

  setWatchID(id: string) {
    localStorage.setItem(this.keys.rc_watchTv, `wtv_${id}`);
  }

  setArtistPanel(id: string) {
    localStorage.setItem(this.keys.rc_artist_panel, `${id}`);
  }

  setMusicSlug(id: string) {
    localStorage.setItem(this.keys.rc_music, `msc_${id}`);
  }

  setAffiliateCode(id: string) {
    localStorage.setItem(this.keys.aff_code, `${id}`);
  }

  setFootballAITeam(team: string) {
    localStorage.setItem(this.keys.rc_football, team);
  }

  setWatchMovieID(id: string) {
    localStorage.setItem(this.keys.rc_watchMovie, `wtm_${id}`);
  }

  setLastPageViewFlexZone(id: string) {
    if (id == "") {
      localStorage.removeItem(this.keys.rc_last_page);
    } else {
      localStorage.setItem(this.keys.rc_last_page, `${id}`);
    }
  }

  // Pricing
  getPricingID() {
    const res = localStorage.getItem(this.keys.rc_pricing);
    return res?.split("_")[1] || false;
  }

  setPricingID(id: string) {
    localStorage.setItem(this.keys.rc_pricing, `pr_${id}`);
  }

  // Subscribers
  removeRedirectSubscriber() {
    localStorage.removeItem(ECOOKIES.localStorage.redirectSubscriber);
  }

  hasRedirectSubscriber() {
    if (localStorage.getItem(ECOOKIES.localStorage.redirectSubscriber)) {
      return true;
    } else {
      return false;
    }
  }
  hasSubscriber() {
    if (localStorage.getItem(ECOOKIES.localStorage.subscriber)) {
      return true;
    } else {
      return false;
    }
  }

  setRedirectSubscriber() {
    localStorage.setItem(
      ECOOKIES.localStorage.redirectSubscriber,
      `sbr_${new Date().getTime()}`
    );
  }

  setSubscriber() {
    localStorage.setItem(
      ECOOKIES.localStorage.subscriber,
      `sb_${new Date().getTime()}`
    );
  }
}

export default new LocalStorageServices();
