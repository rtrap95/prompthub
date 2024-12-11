<template>
  <div
    class="w-full h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 p-4"
  >
    <!-- Icona per cambiare lingua -->
    <div class="absolute top-4 right-4">
      <button @click="showLang = true" class="text-xl hover:text-gray-500">
        <Icon name="material-symbols:language" />
      </button>
    </div>

    <!-- Titolo -->
    <h1 class="text-3xl font-bold mb-2" data-testid="title">
      {{ t("title") }}
    </h1>

    <!-- Descrizione -->
    <p class="text-center max-w-xs mb-4">{{ t("description") }}</p>

    <!-- Card ChatGPT style -->
    <div
      class="relative w-full max-w-md bg-gray-100 dark:bg-gray-800 p-4 rounded-md flex flex-col gap-4"
    >
      <div
        class="relative bg-white dark:bg-gray-700 p-3 rounded-md shadow-sm flex items-center"
        @click="copyPrompt"
        data-testid="prompt-box"
      >
        <div class="flex-1 pr-8">
          <pre class="whitespace-pre-wrap break-words font-mono">{{
            currentPrompt
          }}</pre>
        </div>
        <button class="absolute right-3 text-gray-500 hover:text-gray-300">
          <Icon name="material-symbols:content-copy" />
        </button>
      </div>

      <button
        class="bg-blue-500 hover:bg-blue-600 text-white rounded-md py-2 text-sm font-semibold"
        @click="loadRandomPrompt"
        data-testid="load-random"
      >
        {{ t("loadRandom") }}
      </button>

      <!-- Feedback copia prompt -->
      <transition name="fade">
        <div
          class="text-sm text-green-500"
          v-if="promptCopied"
          data-testid="prompt-copied-feedback"
        >
          {{ t("copied") }}
        </div>
      </transition>
    </div>

    <!-- Box inserimento suggerimento -->
    <div
      class="mt-4 w-full max-w-md bg-gray-50 dark:bg-gray-800 p-4 rounded-md flex flex-col gap-2"
    >
      <input
        v-model="newSuggestion"
        type="text"
        class="w-full p-2 rounded-md bg-white dark:bg-gray-700 dark:text-gray-100"
        :placeholder="t('placeholderSuggestion')"
        data-testid="suggestion-input"
      />
      <button
        class="bg-green-500 hover:bg-green-600 text-white rounded-md py-2 text-sm font-semibold"
        @click="submitSuggestion"
        data-testid="submit-suggestion"
      >
        {{ t("sendSuggestion") }}
      </button>

      <!-- Feedback invio suggerimento -->
      <transition name="fade">
        <div
          class="text-sm text-green-500"
          v-if="suggestionSent"
          data-testid="suggestion-feedback"
        >
          {{ t("suggestionReceived") }}
        </div>
      </transition>
    </div>

    <!-- Overlay per selezione lingua -->
    <transition name="fade">
      <div
        v-if="showLang"
        class="fixed inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center"
      >
        <div class="bg-white dark:bg-gray-800 p-4 rounded-md max-w-xs w-full">
          <h2 class="text-xl font-semibold mb-4">{{ t("selectLanguage") }}</h2>
          <ul class="flex flex-col gap-2">
            <li>
              <button
                @click="changeLanguage('it')"
                class="w-full text-left hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded"
              >
                {{ t("lang.it") }}
              </button>
            </li>
            <li>
              <button
                @click="changeLanguage('en')"
                class="w-full text-left hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded"
              >
                {{ t("lang.en") }}
              </button>
            </li>
            <li>
              <button
                @click="changeLanguage('de')"
                class="w-full text-left hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded"
              >
                {{ t("lang.de") }}
              </button>
            </li>
            <li>
              <button
                @click="changeLanguage('fr')"
                class="w-full text-left hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded"
              >
                {{ t("lang.fr") }}
              </button>
            </li>
          </ul>
          <button
            class="mt-4 w-full bg-red-500 hover:bg-red-600 text-white rounded py-2"
            @click="showLang = false"
          >
            {{ t("close") }}
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
const { t, locale } = useI18n();

// SEO: usare computed per titoli e descrizioni
const pageTitle = computed(() => t("title"));
const pageDescription = computed(() => t("description"));

useHead({
  title: pageTitle,
  meta: [
    { name: "description", content: pageDescription.value },
    { property: "og:title", content: pageTitle.value },
    { property: "og:description", content: pageDescription.value },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
    { name: "twitter:title", content: pageTitle.value },
    { name: "twitter:description", content: pageDescription.value },
  ],
});

// Prompt casuali di esempio
const prompts = [
  "Descrivi un giorno perfetto in stile pirata.",
  "Inventa un supereroe il cui potere è fare ottimi cappuccini.",
  "Racconta una barzelletta usando solo parole che iniziano con la lettera 'P'.",
  "Spiega la teoria della relatività come se parlassi a un pinguino curioso.",
];

const showLang = ref(false);
const currentPrompt = ref(prompts[0]);
const promptCopied = ref(false);
const newSuggestion = ref("");
const suggestionSent = ref(false);

function loadRandomPrompt() {
  const randomIndex = Math.floor(Math.random() * prompts.length);
  currentPrompt.value = prompts[randomIndex];
}

function copyPrompt() {
  navigator.clipboard.writeText(currentPrompt.value);
  promptCopied.value = true;
  setTimeout(() => {
    promptCopied.value = false;
  }, 2000);
}

function submitSuggestion() {
  if (newSuggestion.value.trim() !== "") {
    // Qui potresti inviare il suggerimento al backend
    newSuggestion.value = "";
    suggestionSent.value = true;
    setTimeout(() => {
      suggestionSent.value = false;
    }, 2000);
  }
}

function changeLanguage(lang: "it" | "en" | "fr" | "de") {
  locale.value = lang;
  showLang.value = false;
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
