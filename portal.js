// ============================================================
// Navigation tree — all .md files
// ============================================================
const NAV_TREE = [
  {
    id: 'get-started',
    label: '🚀 Начало работы',
    children: [
      { id: 'get-started/introduction', label: 'Введение' },
      { id: 'get-started/concepts', label: 'Концепции' },
      { id: 'get-started/installation', label: 'Установка' },
      { id: 'get-started/cloud', label: 'Coolify Cloud' },
      { id: 'get-started/usage', label: 'Использование' },
      { id: 'get-started/upgrade', label: 'Обновление' },
      { id: 'get-started/downgrade', label: 'Откат' },
      { id: 'get-started/uninstallation', label: 'Удаление' },
      { id: 'get-started/screenshots', label: 'Скриншоты' },
      { id: 'get-started/videos', label: 'Видео' },
      { id: 'get-started/support', label: 'Поддержка' },
      { id: 'get-started/sponsors', label: 'Спонсоры' },
      { id: 'get-started/team', label: 'Команда' },
      { id: 'get-started/dev', label: 'Разработка' },
      {
        id: 'get-started/contribute',
        label: 'Участие в проекте',
        children: [
          { id: 'get-started/contribute/coolify', label: 'Coolify' },
          { id: 'get-started/contribute/documentation', label: 'Документация' },
        ],
      },
    ],
  },
  {
    id: 'applications',
    label: '📦 Приложения',
    children: [
      { id: 'applications/index', label: 'Обзор' },
      { id: 'applications/django', label: 'Django' },
      { id: 'applications/jekyll', label: 'Jekyll' },
      { id: 'applications/laravel', label: 'Laravel' },
      { id: 'applications/nextjs', label: 'Next.js' },
      { id: 'applications/nuxt', label: 'Nuxt' },
      { id: 'applications/phoenix', label: 'Phoenix' },
      { id: 'applications/rails', label: 'Rails' },
      { id: 'applications/svelte-kit', label: 'SvelteKit' },
      { id: 'applications/symfony', label: 'Symfony' },
      { id: 'applications/vite', label: 'Vite' },
      { id: 'applications/vitepress', label: 'VitePress' },
      { id: 'applications/vuejs', label: 'Vue.js' },
      {
        id: 'applications/build-packs',
        label: 'Build Packs',
        children: [
          { id: 'applications/build-packs/overview', label: 'Обзор' },
          { id: 'applications/build-packs/nixpacks', label: 'Nixpacks' },
          { id: 'applications/build-packs/nixpacks/node-versioning', label: 'Версии Node.js' },
          { id: 'applications/build-packs/dockerfile', label: 'Dockerfile' },
          { id: 'applications/build-packs/docker-compose', label: 'Docker Compose' },
          { id: 'applications/build-packs/static', label: 'Статические сайты' },
        ],
      },
      {
        id: 'applications/ci-cd',
        label: 'CI/CD',
        children: [
          { id: 'applications/ci-cd/introduction', label: 'Введение' },
          { id: 'applications/ci-cd/other-providers', label: 'Другие провайдеры' },
          { id: 'applications/ci-cd/github/overview', label: 'GitHub: Обзор' },
          { id: 'applications/ci-cd/github/setup-app', label: 'GitHub: Настройка App' },
          { id: 'applications/ci-cd/github/actions', label: 'GitHub Actions' },
          { id: 'applications/ci-cd/github/auto-deploy', label: 'GitHub: Автодеплой' },
          { id: 'applications/ci-cd/github/deploy-key', label: 'GitHub: Deploy Key' },
          { id: 'applications/ci-cd/github/preview-deploy', label: 'GitHub: Preview Deploy' },
          { id: 'applications/ci-cd/github/public-repository', label: 'GitHub: Public Repo' },
          { id: 'applications/ci-cd/github/switch-apps', label: 'GitHub: Switch Apps' },
          { id: 'applications/ci-cd/gitlab/integration', label: 'GitLab' },
          { id: 'applications/ci-cd/gitea/integration', label: 'Gitea' },
          { id: 'applications/ci-cd/bitbucket/integration', label: 'Bitbucket' },
        ],
      },
    ],
  },
  {
    id: 'databases',
    label: '🗄️ Базы данных',
    children: [
      { id: 'databases/index', label: 'Обзор' },
      { id: 'databases/postgresql', label: 'PostgreSQL' },
      { id: 'databases/mysql', label: 'MySQL' },
      { id: 'databases/mariadb', label: 'MariaDB' },
      { id: 'databases/mongodb', label: 'MongoDB' },
      { id: 'databases/redis', label: 'Redis' },
      { id: 'databases/keydb', label: 'KeyDB' },
      { id: 'databases/dragonfly', label: 'Dragonfly' },
      { id: 'databases/clickhouse', label: 'ClickHouse' },
      { id: 'databases/backups', label: 'Резервное копирование' },
      { id: 'databases/ssl', label: 'SSL' },
    ],
  },
  {
    id: 'services',
    label: '🛠️ Сервисы',
    children: [
      { id: 'services/introduction', label: 'Введение' },
      { id: 'services/overview', label: 'Обзор' },
      { id: 'services/all', label: '📋 Все сервисы' },
      {
        id: 'services-admin',
        label: '🖥️ Администрирование',
        children: [
          { id: 'services/cockpit', label: 'Cockpit' },
          { id: 'services/dashboard', label: 'Dashboard' },
          { id: 'services/dashy', label: 'Dashy' },
          { id: 'services/glance', label: 'Glance' },
          { id: 'services/heimdall', label: 'Heimdall' },
          { id: 'services/homarr', label: 'Homarr' },
          { id: 'services/homepage', label: 'Homepage' },
          { id: 'services/litequeen', label: 'LiteQueen' },
          { id: 'services/organizr', label: 'Organizr' },
        ],
      },
      {
        id: 'services-ai',
        label: '🤖 ИИ',
        children: [
          { id: 'services/anythingllm', label: 'AnythingLLM' },
          { id: 'services/metamcp', label: 'MetaMCP' },
          { id: 'services/argilla', label: 'Argilla' },
          { id: 'services/chroma', label: 'Chroma' },
          { id: 'services/flowise', label: 'Flowise' },
          { id: 'services/labelstudio', label: 'Label Studio' },
          { id: 'services/langflow', label: 'Langflow' },
          { id: 'services/langfuse', label: 'Langfuse' },
          { id: 'services/librechat', label: 'LibreChat' },
          { id: 'services/libretranslate', label: 'LibreTranslate' },
          { id: 'services/lobe-chat', label: 'LobeChat' },
          { id: 'services/litellm', label: 'LiteLLM' },
          { id: 'services/mindsdb', label: 'MindsDB' },
          { id: 'services/newapi', label: 'NewAPI' },
          { id: 'services/ollama', label: 'Ollama' },
          { id: 'services/open-webui', label: 'Open WebUI' },
          { id: 'services/openclaw', label: 'OpenClaw' },
          { id: 'services/qdrant', label: 'Qdrant' },
          { id: 'services/unstructured', label: 'Unstructured' },
          { id: 'services/weaviate', label: 'Weaviate' },
        ],
      },
      {
        id: 'services-analytics',
        label: '📊 Аналитика',
        children: [
          { id: 'services/goatcounter', label: 'GoatCounter' },
          { id: 'services/metabase', label: 'Metabase' },
          { id: 'services/openpanel', label: 'OpenPanel' },
          { id: 'services/posthog', label: 'PostHog' },
          { id: 'services/plausible', label: 'Plausible' },
          { id: 'services/rybbit', label: 'Rybbit' },
          { id: 'services/sequin', label: 'Sequin' },
          { id: 'services/superset', label: 'Superset' },
          { id: 'services/swetrix', label: 'Swetrix' },
          { id: 'services/umami', label: 'Umami' },
        ],
      },
      {
        id: 'services-automation',
        label: '⚡ Автоматизация',
        children: [
          { id: 'services/activepieces', label: 'Activepieces' },
          { id: 'services/evolution-api', label: 'Evolution API' },
          { id: 'services/mage-ai', label: 'Mage AI' },
          { id: 'services/n8n', label: 'n8n' },
          { id: 'services/trigger', label: 'Trigger' },
        ],
      },
      {
        id: 'services-backup',
        label: '💾 Резервное копирование',
        children: [
          { id: 'services/databasus', label: 'Databasus' },
          { id: 'services/duplicati', label: 'Duplicati' },
        ],
      },
      {
        id: 'services-bookmarks',
        label: '🔖 Закладки',
        children: [
          { id: 'services/hoarder', label: 'Hoarder' },
          { id: 'services/linkding', label: 'Linkding' },
        ],
      },
      {
        id: 'services-business',
        label: '💼 Бизнес',
        children: [
          { id: 'services/chaskiq', label: 'Chaskiq' },
          { id: 'services/chatwoot', label: 'Chatwoot' },
          { id: 'services/twenty', label: 'Twenty' },
          { id: 'services/documenso', label: 'Documenso' },
          { id: 'services/docuseal', label: 'Docuseal' },
          { id: 'services/dolibarr', label: 'Dolibarr' },
          { id: 'services/easyappointments', label: 'Easy Appointments' },
          { id: 'services/fider', label: 'Fider' },
          { id: 'services/freescout', label: 'FreeScout' },
          { id: 'services/glpi', label: 'GLPI' },
          { id: 'services/invoice-ninja', label: 'Invoice Ninja' },
          { id: 'services/kimai', label: 'Kimai' },
          { id: 'services/limesurvey', label: 'LimeSurvey' },
          { id: 'services/odoo', label: 'Odoo' },
          { id: 'services/orangehrm', label: 'OrangeHRM' },
          { id: 'services/osticket', label: 'osTicket' },
          { id: 'services/paymenter', label: 'Paymenter' },
        ],
      },
      {
        id: 'services-cms',
        label: '📝 CMS',
        children: [
          { id: 'services/classicpress', label: 'ClassicPress' },
          { id: 'services/directus', label: 'Directus' },
          { id: 'services/drupal', label: 'Drupal' },
          { id: 'services/ghost', label: 'Ghost' },
          { id: 'services/joomla', label: 'Joomla' },
          { id: 'services/strapi', label: 'Strapi' },
          { id: 'services/wordpress', label: 'WordPress' },
        ],
      },
      {
        id: 'services-communication',
        label: '💬 Общение',
        children: [
          { id: 'services/gowa', label: 'GoWa' },
          { id: 'services/matrix', label: 'Matrix' },
          { id: 'services/mattermost', label: 'Mattermost' },
          { id: 'services/once-campfire', label: 'Once Campfire' },
          { id: 'services/rocketchat', label: 'Rocket.Chat' },
          { id: 'services/soju', label: 'Soju' },
        ],
      },
      {
        id: 'services-databases',
        label: '🗃️ Базы данных',
        children: [
          { id: 'services/autobase', label: 'Autobase' },
          { id: 'services/nocodb', label: 'NocoDB' },
          { id: 'services/pgbackweb', label: 'PGBackWeb' },
          { id: 'services/teable', label: 'Teable' },
        ],
      },
      {
        id: 'services-dev',
        label: '🔧 Разработка',
        children: [
          { id: 'services/apprise-api', label: 'Apprise API' },
          { id: 'services/appsmith', label: 'Appsmith' },
          { id: 'services/appwrite', label: 'Appwrite' },
          { id: 'services/browserless', label: 'Browserless' },
          { id: 'services/budibase', label: 'Budibase' },
          { id: 'services/bugsink', label: 'Bugsink' },
          { id: 'services/cloudbeaver', label: 'CloudBeaver' },
          { id: 'services/cloudflared', label: 'Cloudflared' },
          { id: 'services/code-server', label: 'Code Server' },
          { id: 'services/convex', label: 'Convex' },
          { id: 'services/denokv', label: 'Deno KV' },
          { id: 'services/docker-registry', label: 'Docker Registry' },
          { id: 'services/dozzle', label: 'Dozzle' },
          { id: 'services/drizzle-gateway', label: 'Drizzle Gateway' },
          { id: 'services/flipt', label: 'Flipt' },
          { id: 'services/forgejo', label: 'Forgejo' },
          { id: 'services/formbricks', label: 'Formbricks' },
          { id: 'services/gitea', label: 'Gitea' },
          { id: 'services/github-runner', label: 'GitHub Runner' },
          { id: 'services/gitlab', label: 'GitLab' },
          { id: 'services/glitchtip', label: 'GlitchTip' },
          { id: 'services/gotenberg', label: 'Gotenberg' },
          { id: 'services/hatchet', label: 'Hatchet' },
          { id: 'services/heyform', label: 'HeyForm' },
          { id: 'services/hoppscotch', label: 'Hoppscotch' },
          { id: 'services/it-tools', label: 'IT Tools' },
          { id: 'services/jenkins', label: 'Jenkins' },
          { id: 'services/jupyter-notebook-python', label: 'Jupyter Notebook' },
          { id: 'services/kuzzle', label: 'Kuzzle' },
          { id: 'services/lowcoder', label: 'Lowcoder' },
          { id: 'services/mailpit', label: 'Mailpit' },
          { id: 'services/marimo', label: 'Marimo' },
          { id: 'services/martin', label: 'Martin' },
          { id: 'services/neon-ws-proxy', label: 'Neon WS Proxy' },
          { id: 'services/nexus', label: 'Nexus' },
          { id: 'services/next-image-transformation', label: 'Next Image Transformation' },
          { id: 'services/nitropage', label: 'Nitropage' },
          { id: 'services/nocobase', label: 'NocoBase' },
          { id: 'services/onedev', label: 'OneDev' },
          { id: 'services/openblocks', label: 'Openblocks' },
          { id: 'services/opnform', label: 'OpnForm' },
          { id: 'services/pgadmin', label: 'pgAdmin' },
          { id: 'services/phpmyadmin', label: 'phpMyAdmin' },
          { id: 'services/pocketbase', label: 'PocketBase' },
          { id: 'services/portainer', label: 'Portainer' },
          { id: 'services/prefect', label: 'Prefect' },
          { id: 'services/proxyscotch', label: 'Proxyscotch' },
          { id: 'services/privatebin', label: 'PrivateBin' },
          { id: 'services/rabbitmq', label: 'RabbitMQ' },
          { id: 'services/redis-insight', label: 'Redis Insight' },
          { id: 'services/rivet-engine', label: 'Rivet Engine' },
          { id: 'services/shlink', label: 'Shlink' },
          { id: 'services/soketi', label: 'Soketi' },
          { id: 'services/soketi-app-manager', label: 'Soketi App Manager' },
          { id: 'services/supabase', label: 'Supabase' },
          { id: 'services/tolgee', label: 'Tolgee' },
          { id: 'services/trailbase', label: 'TrailBase' },
          { id: 'services/unleash', label: 'Unleash' },
          { id: 'services/vvveb', label: 'VvvebJs' },
          { id: 'services/wakapi', label: 'Wakapi' },
          { id: 'services/web-check', label: 'Web Check' },
          { id: 'services/weblate', label: 'Weblate' },
          { id: 'services/windmill', label: 'Windmill' },
        ],
      },
      {
        id: 'services-docs',
        label: '📚 Документация',
        children: [
          { id: 'services/bookstack', label: 'BookStack' },
          { id: 'services/docmost', label: 'Docmost' },
          { id: 'services/dokuwiki', label: 'DokuWiki' },
          { id: 'services/mediawiki', label: 'MediaWiki' },
          { id: 'services/paperless', label: 'Paperless' },
          { id: 'services/stirling-pdf', label: 'Stirling PDF' },
          { id: 'services/wikijs', label: 'Wiki.js' },
        ],
      },
      {
        id: 'services-finance',
        label: '💰 Финансы',
        children: [
          { id: 'services/actualbudget', label: 'Actual Budget' },
          { id: 'services/budge', label: 'BudgE' },
          { id: 'services/firefly', label: 'Firefly III' },
          { id: 'services/maybe', label: 'Maybe' },
          { id: 'services/sure', label: 'Sure' },
        ],
      },
      {
        id: 'services-files',
        label: '📁 Файлы',
        children: [
          { id: 'services/chibisafe', label: 'Chibisafe' },
          { id: 'services/filebrowser', label: 'Filebrowser' },
          { id: 'services/fileflows', label: 'FileFlows' },
          { id: 'services/pairdrop', label: 'Pairdrop' },
          { id: 'services/pingvinshare', label: 'PingvinShare' },
          { id: 'services/sftpgo', label: 'SFTPGo' },
          { id: 'services/snapdrop', label: 'Snapdrop' },
          { id: 'services/syncthing', label: 'Syncthing' },
          { id: 'services/zipline', label: 'Zipline' },
        ],
      },
      {
        id: 'services-games',
        label: '🎮 Игры',
        children: [
          { id: 'services/satisfactory', label: 'Satisfactory' },
          { id: 'services/foundryvtt', label: 'FoundryVTT' },
          { id: 'services/minecraft', label: 'Minecraft' },
          { id: 'services/palworld', label: 'Palworld' },
          { id: 'services/pterodactyl', label: 'Pterodactyl' },
          { id: 'services/terraria-server', label: 'Terraria Server' },
          { id: 'services/wings', label: 'Wings' },
        ],
      },
      {
        id: 'services-home',
        label: '🏠 Дом',
        children: [
          { id: 'services/grocy', label: 'Grocy' },
          { id: 'services/home-assistant', label: 'Home Assistant' },
          { id: 'services/homebox', label: 'Homebox' },
          { id: 'services/mealie', label: 'Mealie' },
        ],
      },
      {
        id: 'services-marketing',
        label: '📣 Маркетинг',
        children: [
          { id: 'services/listmonk', label: 'Listmonk' },
          { id: 'services/mautic', label: 'Mautic' },
          { id: 'services/plunk', label: 'Plunk' },
        ],
      },
      {
        id: 'services-media',
        label: '🎬 Медиа',
        children: [
          { id: 'services/audiobookshelf', label: 'Audiobookshelf' },
          { id: 'services/booklore', label: 'Booklore' },
          { id: 'services/calibre-web', label: 'Calibre-web' },
          { id: 'services/calibre-web-automated-with-downloader', label: 'Calibre Web Automated' },
          { id: 'services/cap', label: 'Cap' },
          { id: 'services/castopod', label: 'Castopod' },
          { id: 'services/emby', label: 'Emby' },
          { id: 'services/embystat', label: 'Emby Stat' },
          { id: 'services/immich', label: 'Immich' },
          { id: 'services/jellyfin', label: 'Jellyfin' },
          { id: 'services/metube', label: 'MeTube' },
          { id: 'services/navidrome', label: 'Navidrome' },
          { id: 'services/overseerr', label: 'Overseerr' },
          { id: 'services/plex', label: 'Plex' },
          { id: 'services/prowlarr', label: 'Prowlarr' },
          { id: 'services/qbittorrent', label: 'qBittorrent' },
          { id: 'services/radarr', label: 'Radarr' },
          { id: 'services/sonarr', label: 'Sonarr' },
          { id: 'services/transmission', label: 'Transmission' },
          { id: 'services/yamtrack', label: 'Yamtrack' },
        ],
      },
      {
        id: 'services-monitoring',
        label: '📡 Мониторинг',
        children: [
          { id: 'services/beszel', label: 'Beszel' },
          { id: 'services/changedetection', label: 'Changedetection' },
          { id: 'services/checkmate', label: 'Checkmate' },
          { id: 'services/diun', label: 'Diun' },
          { id: 'services/glances', label: 'Glances' },
          { id: 'services/grafana', label: 'Grafana' },
          { id: 'services/observium', label: 'Observium' },
          { id: 'services/signoz', label: 'SigNoz' },
          { id: 'services/statusnook', label: 'Statusnook' },
          { id: 'services/uptime-kuma', label: 'Uptime Kuma' },
        ],
      },
      {
        id: 'services-network',
        label: '🌐 Сети',
        children: [
          { id: 'services/cloudflared', label: 'Cloudflared' },
          { id: 'services/netbird-client', label: 'NetBird Client' },
          { id: 'services/newt-pangolin', label: 'Newt Pangolin' },
          { id: 'services/tailscale-client', label: 'Tailscale Client' },
          { id: 'services/wireguard-easy', label: 'WireGuard Easy' },
          { id: 'services/pi-hole', label: 'Pi-hole' },
        ],
      },
      {
        id: 'services-notifications',
        label: '🔔 Уведомления',
        children: [
          { id: 'services/ntfy', label: 'ntfy' },
          { id: 'services/gotify', label: 'Gotify' },
        ],
      },
      {
        id: 'services-productivity',
        label: '✅ Продуктивность',
        children: [
          { id: 'services/affine', label: 'AFFiNE' },
          { id: 'services/alexandrie', label: 'Alexandrie' },
          { id: 'services/appflowy', label: 'AppFlowy' },
          { id: 'services/bento-pdf', label: 'BentoPDF' },
          { id: 'services/calcom', label: 'Cal.com' },
          { id: 'services/codimd', label: 'CodiMD' },
          { id: 'services/ente-photos', label: 'Ente' },
          { id: 'services/excalidraw', label: 'Excalidraw' },
          { id: 'services/grist', label: 'Grist' },
          { id: 'services/joplin', label: 'Joplin' },
          { id: 'services/karakeep', label: 'KaraKeep' },
          { id: 'services/libreoffice', label: 'LibreOffice' },
          { id: 'services/memos', label: 'Memos' },
          { id: 'services/getoutline', label: 'Outline' },
          { id: 'services/rallly', label: 'Rallly' },
          { id: 'services/reactive-resume', label: 'Reactive Resume' },
          { id: 'services/readeck', label: 'Readeck' },
          { id: 'services/ryot', label: 'Ryot' },
          { id: 'services/silverbullet', label: 'SilverBullet' },
          { id: 'services/siyuan', label: 'Siyuan' },
          { id: 'services/slash', label: 'Slash' },
          { id: 'services/triliumnext', label: 'TriliumNext' },
          { id: 'services/vikunja', label: 'Vikunja' },
        ],
      },
      {
        id: 'services-pm',
        label: '📋 Управление проектами',
        children: [
          { id: 'services/fizzy', label: 'Fizzy' },
          { id: 'services/leantime', label: 'Leantime' },
          { id: 'services/plane', label: 'Plane' },
          { id: 'services/redmine', label: 'Redmine' },
        ],
      },
      {
        id: 'services-rss',
        label: '📰 RSS',
        children: [
          { id: 'services/freshrss', label: 'FreshRSS' },
          { id: 'services/miniflux', label: 'Miniflux' },
        ],
      },
      {
        id: 'services-search',
        label: '🔍 Поиск',
        children: [
          { id: 'services/elasticsearch', label: 'Elasticsearch' },
          { id: 'services/meilisearch', label: 'Meilisearch' },
          { id: 'services/searxng', label: 'SearXNG' },
          { id: 'services/typesense', label: 'Typesense' },
          { id: 'services/whoogle', label: 'Whoogle' },
        ],
      },
      {
        id: 'services-security',
        label: '🔒 Безопасность',
        children: [
          { id: 'services/authentik', label: 'Authentik' },
          { id: 'services/cryptgeon', label: 'Cryptgeon' },
          { id: 'services/cyberchef', label: 'CyberChef' },
          { id: 'services/faraday', label: 'Faraday' },
          { id: 'services/infisical', label: 'Infisical' },
          { id: 'services/keycloak', label: 'Keycloak' },
          { id: 'services/logto', label: 'Logto' },
          { id: 'services/onetimesecret', label: 'Onetime Secret' },
          { id: 'services/passbolt', label: 'Passbolt' },
          { id: 'services/pocket-id', label: 'Pocket ID' },
          { id: 'services/supertokens', label: 'SuperTokens' },
          { id: 'services/vaultwarden', label: 'Vaultwarden' },
        ],
      },
      {
        id: 'services-social',
        label: '📱 Соцсети',
        children: [
          { id: 'services/bluesky-pds', label: 'Bluesky PDS' },
          { id: 'services/mixpost', label: 'Mixpost' },
          { id: 'services/postiz', label: 'Postiz' },
          { id: 'services/redlib', label: 'Redlib' },
        ],
      },
      {
        id: 'services-storage',
        label: '🗄️ Хранилище',
        children: [
          { id: 'services/cloudreve', label: 'Cloudreve' },
          { id: 'services/garage', label: 'Garage' },
          { id: 'services/minio', label: 'MinIO' },
          { id: 'services/nextcloud', label: 'Nextcloud' },
          { id: 'services/owncloud', label: 'ownCloud' },
          { id: 'services/seafile', label: 'Seafile' },
          { id: 'services/seaweedfs', label: 'SeaweedFS' },
        ],
      },
      {
        id: 'services-utils',
        label: '🛠️ Утилиты',
        children: [
          { id: 'services/convertx', label: 'ConvertX' },
          { id: 'services/vert', label: 'Vert' },
          { id: 'services/bitcoin-core', label: 'Bitcoin Core' },
          { id: 'services/firefox', label: 'Firefox' },
          { id: 'services/gramps-web', label: 'Gramps Web' },
          { id: 'services/babybuddy', label: 'Baby Buddy' },
          { id: 'services/sparkyfitness', label: 'SparkyFitness' },
          { id: 'services/esphome', label: 'ESPHome' },
          { id: 'services/mosquitto', label: 'Mosquitto' },
          { id: 'services/traccar', label: 'Traccar' },
          { id: 'services/moodle', label: 'Moodle' },
          { id: 'services/open-archiver', label: 'Open Archiver' },
          { id: 'services/sessy', label: 'Sessy' },
          { id: 'services/usesend', label: 'Usesend' },
          { id: 'services/nodebb', label: 'NodeBB' },
        ],
      },
    ],
  },
  {
    id: 'knowledge-base',
    label: '📚 База знаний',
    children: [
      { id: 'knowledge-base/overview', label: 'Обзор' },
      { id: 'knowledge-base/faq', label: 'FAQ' },
      { id: 'knowledge-base/commands', label: 'Команды' },
      { id: 'knowledge-base/domains', label: 'Домены' },
      { id: 'knowledge-base/environment-variables', label: 'Переменные окружения' },
      { id: 'knowledge-base/health-checks', label: 'Health Checks' },
      { id: 'knowledge-base/monitoring', label: 'Мониторинг' },
      { id: 'knowledge-base/notifications', label: 'Уведомления' },
      { id: 'knowledge-base/oauth', label: 'OAuth' },
      { id: 'knowledge-base/persistent-storage', label: 'Хранилище' },
      { id: 'knowledge-base/rolling-updates', label: 'Rolling Updates' },
      { id: 'knowledge-base/self-update', label: 'Самообновление' },
      { id: 'knowledge-base/custom-docker-registry', label: 'Docker Registry' },
      { id: 'knowledge-base/cron-syntax', label: 'Cron-синтаксис' },
      { id: 'knowledge-base/dns-configuration', label: 'DNS' },
      { id: 'knowledge-base/drain-logs', label: 'Логи' },
      { id: 'knowledge-base/change-localhost-key', label: 'Localhost Key' },
      { id: 'knowledge-base/create-root-user-with-env', label: 'Root User' },
      { id: 'knowledge-base/define-custom-docker-network-with-env', label: 'Docker Network' },
      { id: 'knowledge-base/delete-user', label: 'Удаление пользователя' },
      {
        id: 'knowledge-base/destinations',
        label: 'Destinations',
        children: [
          { id: 'knowledge-base/destinations/index', label: 'Обзор' },
          { id: 'knowledge-base/destinations/create', label: 'Создание' },
          { id: 'knowledge-base/destinations/manage', label: 'Управление' },
        ],
      },
      {
        id: 'knowledge-base/docker',
        label: 'Docker',
        children: [
          { id: 'knowledge-base/docker/compose', label: 'Compose' },
          { id: 'knowledge-base/docker/custom-commands', label: 'Команды' },
          { id: 'knowledge-base/docker/registry', label: 'Registry' },
          { id: 'knowledge-base/docker/swarm', label: 'Swarm' },
        ],
      },
      {
        id: 'knowledge-base/how-to',
        label: 'Руководства',
        children: [
          { id: 'knowledge-base/how-to/backup-restore-coolify', label: 'Бэкап и восстановление' },
          { id: 'knowledge-base/how-to/hetzner-loadbalancing', label: 'Hetzner балансировщик' },
          { id: 'knowledge-base/how-to/migrate-apps-different-host', label: 'Миграция приложений' },
          { id: 'knowledge-base/how-to/ollama-with-gpu', label: 'Ollama + GPU' },
          { id: 'knowledge-base/how-to/private-npm-registry', label: 'Private NPM' },
          { id: 'knowledge-base/how-to/raspberry-pi-os', label: 'Raspberry Pi OS' },
          { id: 'knowledge-base/how-to/webstudio-with-hetzner', label: 'Webstudio + Hetzner' },
          { id: 'knowledge-base/how-to/wordpress-multisite', label: 'WordPress Multisite' },
        ],
      },
      {
        id: 'knowledge-base/internal',
        label: 'Внутренние',
        children: [
          { id: 'knowledge-base/internal/scalability', label: 'Масштабируемость' },
          { id: 'knowledge-base/internal/terminal', label: 'Терминал' },
        ],
      },
      {
        id: 'knowledge-base/proxy',
        label: 'Прокси',
        children: [
          { id: 'knowledge-base/proxy/traefik/overview', label: 'Traefik: Обзор' },
          { id: 'knowledge-base/proxy/traefik/basic-auth', label: 'Traefik: Basic Auth' },
          { id: 'knowledge-base/proxy/traefik/custom-ssl-certs', label: 'Traefik: SSL' },
          { id: 'knowledge-base/proxy/traefik/dashboard', label: 'Traefik: Dashboard' },
          { id: 'knowledge-base/proxy/traefik/dynamic-config', label: 'Traefik: Конфигурация' },
          { id: 'knowledge-base/proxy/traefik/load-balancing', label: 'Traefik: Балансировка' },
          { id: 'knowledge-base/proxy/traefik/protect-services-with-authentik', label: 'Traefik + Authentik' },
          { id: 'knowledge-base/proxy/traefik/redirects', label: 'Traefik: Редиректы' },
          { id: 'knowledge-base/proxy/traefik/wildcard-certs', label: 'Traefik: Wildcard SSL' },
          { id: 'knowledge-base/proxy/caddy/overview', label: 'Caddy: Обзор' },
          { id: 'knowledge-base/proxy/caddy/basic-auth', label: 'Caddy: Basic Auth' },
        ],
      },
      {
        id: 'knowledge-base/s3',
        label: 'S3',
        children: [
          { id: 'knowledge-base/s3/introduction', label: 'Введение' },
          { id: 'knowledge-base/s3/aws', label: 'AWS S3' },
          { id: 'knowledge-base/s3/r2', label: 'Cloudflare R2' },
        ],
      },
      {
        id: 'knowledge-base/server',
        label: 'Серверы',
        children: [
          { id: 'knowledge-base/server/automated-cleanup', label: 'Автоочистка' },
          { id: 'knowledge-base/server/build-server', label: 'Build Server' },
          { id: 'knowledge-base/server/configure-build-server', label: 'Настройка Build Server' },
          { id: 'knowledge-base/server/firewall', label: 'Firewall' },
          { id: 'knowledge-base/server/introduction', label: 'Введение' },
          { id: 'knowledge-base/server/multiple-servers', label: 'Много серверов' },
          { id: 'knowledge-base/server/openstack', label: 'OpenStack' },
          { id: 'knowledge-base/server/oracle-cloud', label: 'Oracle Cloud' },
          { id: 'knowledge-base/server/proxies', label: 'Прокси' },
          { id: 'knowledge-base/server/resources', label: 'Ресурсы' },
          { id: 'knowledge-base/server/sentinel', label: 'Sentinel' },
          { id: 'knowledge-base/server/ssh-keys', label: 'SSH ключи' },
        ],
      },
    ],
  },
  {
    id: 'integrations',
    label: '🔌 Интеграции',
    children: [
      { id: 'integrations/cloudflare/ddos-protection', label: 'Cloudflare: DDoS' },
      { id: 'integrations/cloudflare/tunnels/overview', label: 'Cloudflare: Tunnels' },
      { id: 'integrations/cloudflare/tunnels/applications', label: 'Cloudflare: Apps' },
      { id: 'integrations/cloudflare/tunnels/databases', label: 'Cloudflare: БД' },
      { id: 'integrations/cloudflare/tunnels/services', label: 'Cloudflare: Сервисы' },
      { id: 'integrations/cloudflare/tunnels/wildcard-domains', label: 'Cloudflare: Wildcard' },
    ],
  },
  {
    id: 'api-reference',
    label: '🔑 API',
    children: [
      { id: 'api-reference/authorization', label: 'Авторизация' },
      { id: 'api-reference/api/index', label: 'API Reference' },
    ],
  },
  {
    id: 'troubleshoot',
    label: '🔧 Устранение проблем',
    children: [
      { id: 'troubleshoot/overview', label: 'Обзор' },
      { id: 'troubleshoot/applications/bad-gateway', label: 'Bad Gateway' },
      { id: 'troubleshoot/applications/failed-to-get-token', label: 'Failed to Get Token' },
      { id: 'troubleshoot/applications/gateway-timeout', label: 'Gateway Timeout' },
      { id: 'troubleshoot/applications/no-available-server', label: 'No Available Server' },
      { id: 'troubleshoot/dashboard/dashboard-inaccessible', label: 'Dashboard недоступен' },
      { id: 'troubleshoot/dashboard/dashboard-slow-performance', label: 'Медленный Dashboard' },
      { id: 'troubleshoot/dashboard/disable-2fa-manually', label: 'Отключить 2FA' },
      { id: 'troubleshoot/dns-and-domains/certificate-resolver-doesnt-exist', label: 'Certificate Resolver' },
      { id: 'troubleshoot/dns-and-domains/lets-encrypt-not-working', label: "Let's Encrypt" },
      { id: 'troubleshoot/dns-and-domains/wildcard-ssl-certs', label: 'Wildcard SSL' },
      { id: 'troubleshoot/docker/expired-github-personal-access-token', label: 'GitHub PAT' },
      { id: 'troubleshoot/installation/docker-install-failed', label: 'Docker не установился' },
      { id: 'troubleshoot/installation/install-script-failed', label: 'Скрипт установки' },
      { id: 'troubleshoot/server/connection-issues', label: 'Проблемы подключения' },
      { id: 'troubleshoot/server/crash-during-build', label: 'Крэш при сборке' },
      { id: 'troubleshoot/server/raspberry-crashes', label: 'Raspberry Pi крэш' },
      { id: 'troubleshoot/server/two-factor-stopped-working', label: '2FA не работает' },
      { id: 'troubleshoot/server/validation-issues', label: 'Ошибки валидации' },
    ],
  },
];

// ============================================================
// State
// ============================================================
let currentPage = null;
let searchQuery = '';
const expandedSections = new Set();

// ============================================================
// Helpers
// ============================================================
function stripFrontmatter(text) {
  if (text.startsWith('---')) {
    const end = text.indexOf('---', 3);
    if (end !== -1) return text.slice(end + 3).trim();
  }
  return text;
}

function extractTitle(text, id) {
  const match = text.match(/^---[\s\S]*?^title:\s*(.+)$/m);
  if (match) return match[1].trim();
  const h1 = text.match(/^#\s+(.+)$/m);
  if (h1) return h1[1].trim();
  // Fallback: use last segment of id
  return id.split('/').pop().replace(/-/g, ' ');
}

function pathToMd(id) {
  return id + '.md';
}

// Collect all leaf nodes for search
function collectLeaves(nodes, acc = []) {
  for (const n of nodes) {
    if (n.children) collectLeaves(n.children, acc);
    else acc.push(n);
  }
  return acc;
}

// ============================================================
// Render sidebar
// ============================================================
function renderSidebar() {
  const sidebar = document.getElementById('sidebar-nav');
  sidebar.innerHTML = '';
  sidebar.appendChild(buildTree(NAV_TREE, 0));
}

function matchesSearch(node) {
  if (!searchQuery) return true;
  const q = searchQuery.toLowerCase();
  if (node.label.toLowerCase().includes(q)) return true;
  if (node.children) return node.children.some(matchesSearch);
  return false;
}

function buildTree(nodes, depth) {
  const ul = document.createElement('ul');
  ul.className = 'nav-list' + (depth === 0 ? ' nav-root' : '');

  for (const node of nodes) {
    if (!matchesSearch(node)) continue;

    const li = document.createElement('li');
    li.className = 'nav-item';

    if (node.children) {
      const isOpen = expandedSections.has(node.id) || (searchQuery && node.children.some(matchesSearch));

      const toggle = document.createElement('button');
      toggle.className = 'nav-group' + (isOpen ? ' open' : '');
      toggle.setAttribute('data-id', node.id);
      toggle.innerHTML = `
        <span class="nav-group-label">${node.label}</span>
        <span class="nav-chevron">${isOpen ? '▾' : '▸'}</span>
      `;
      toggle.addEventListener('click', () => {
        if (expandedSections.has(node.id)) expandedSections.delete(node.id);
        else expandedSections.add(node.id);
        renderSidebar();
      });
      li.appendChild(toggle);

      const sub = buildTree(node.children, depth + 1);
      sub.className += ' nav-sub' + (isOpen ? ' open' : '');
      li.appendChild(sub);
    } else {
      const a = document.createElement('a');
      a.className = 'nav-link' + (node.id === currentPage ? ' active' : '');
      a.textContent = node.label;
      a.href = '#' + node.id;
      a.addEventListener('click', e => {
        e.preventDefault();
        loadPage(node.id);
      });
      li.appendChild(a);
    }

    ul.appendChild(li);
  }
  return ul;
}

// ============================================================
// Load & render a page
// ============================================================
async function loadPage(id) {
  if (!id) return;

  currentPage = id;
  window.location.hash = id;

  // Scroll sidebar into view
  scrollActiveLinkIntoView();

  const content = document.getElementById('content');
  content.innerHTML = '<div class="loading"><div class="spinner"></div><span>Загрузка…</span></div>';

  // Auto-expand parent sections
  autoExpand(NAV_TREE, id);
  renderSidebar();

  try {
    const resp = await fetch(pathToMd(id));
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    const raw = await resp.text();
    const title = extractTitle(raw, id);
    const body = stripFrontmatter(raw);

    // Configure marked with custom heading renderer to fix anchor IDs
    const renderer = new marked.Renderer();
    renderer.heading = function (text, level) {
      const slug = headingSlug(text);
      return `<h${level} id="${slug}" data-slug="${slug}">${text}</h${level}>\n`;
    };

    marked.setOptions({
      gfm: true,
      breaks: false,
      renderer,
      highlight: (code, lang) => {
        if (lang && hljs.getLanguage(lang)) {
          try { return hljs.highlight(code, { language: lang }).value; } catch (_) { }
        }
        return hljs.highlightAuto(code).value;
      },
    });

    // Pre-process: convert VitePress custom alert syntax "> [!NOTE]" etc.
    const processed = preprocessMarkdown(body);
    let html = marked.parse(processed);

    // Post-process custom Vue components
    html = postprocessHtml(html);

    content.innerHTML = `
      <article class="doc-page">
        <header class="doc-header">
          <div class="breadcrumb">${buildBreadcrumb(id)}</div>
          <h1 class="doc-title">${title}</h1>
        </header>
        <div class="doc-body">${html}</div>
      </article>
    `;

    // Apply highlight.js to any code blocks missed
    content.querySelectorAll('pre code').forEach(el => hljs.highlightElement(el));

    // Intercept all links inside rendered content
    const docBody = content.querySelector('.doc-body');
    if (docBody) interceptContentLinks(docBody);

    // Scroll to top of content
    content.scrollTop = 0;
    document.getElementById('main-area').scrollTo(0, 0);

    // Update page title
    document.title = `${title} — Coolify Docs RU`;

  } catch (err) {
    content.innerHTML = `
      <div class="error-page">
        <div class="error-icon">📄</div>
        <h2>Не удалось загрузить страницу</h2>
        <p>${pathToMd(id)}</p>
        <p class="error-detail">${err.message}</p>
        <p class="error-hint">Убедитесь, что портал открыт через HTTP-сервер, а не по file://</p>
      </div>`;
  }
}

// ============================================================
// Preprocessors
// ============================================================
function preprocessMarkdown(text) {
  let result = text;

  // ------------------------------------------------------------
  // 1. VitePress ::: container blocks
  // ::: warning [optional title]\ncontent\n:::
  // ------------------------------------------------------------
  const containerTypes = {
    'warning': { icon: '⚠️', cls: 'container-warning' },
    'info': { icon: 'ℹ️', cls: 'container-info' },
    'tip': { icon: '💡', cls: 'container-tip' },
    'danger': { icon: '🚨', cls: 'container-danger' },
    'caution': { icon: '🚨', cls: 'container-danger' },
    'details': { icon: '📋', cls: 'container-details' },
  };

  result = result.replace(
    /^:::[ \t]*(\w+)([^\n]*)\n([\s\S]*?)^:::/gm,
    (match, type, titleRest, body) => {
      const ltype = type.toLowerCase();
      const meta = containerTypes[ltype] || { icon: 'ℹ️', cls: 'container-info' };
      const title = titleRest.trim();
      const titleHtml = title
        ? `<span class="container-title">${meta.icon} ${title}</span>`
        : `<span class="container-title">${meta.icon} ${type.charAt(0).toUpperCase() + type.slice(1)}</span>`;
      return `<div class="md-container ${meta.cls}">${titleHtml}<div class="container-body">\n\n${body.trim()}\n\n</div></div>\n\n`;
    }
  );

  // ------------------------------------------------------------
  // 2. VitePress > [!NOTE] style alerts
  // ------------------------------------------------------------
  const alertTypes = {
    'NOTE': { icon: 'ℹ️', cls: 'alert-note' },
    'TIP': { icon: '💡', cls: 'alert-tip' },
    'IMPORTANT': { icon: '❗', cls: 'alert-important' },
    'WARNING': { icon: '⚠️', cls: 'alert-warning' },
    'CAUTION': { icon: '🚨', cls: 'alert-caution' },
  };

  result = result.replace(
    /^>\s\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*\n((?:>.*\n?)*)/gm,
    (match, type, body) => {
      const { icon, cls } = alertTypes[type] || alertTypes['NOTE'];
      const content = body.replace(/^>\s?/gm, '').trim();
      return `<div class="md-alert ${cls}"><span class="alert-icon">${icon}</span><div class="alert-body">\n\n${content}\n\n</div></div>\n\n`;
    }
  );

  return result;
}

function postprocessHtml(html) {
  // Strip VitePress-specific Vue components not renderable
  html = html.replace(/<ZoomableImage[^>]*\/>/g, '');
  html = html.replace(/<ZoomableImage[^>]*>[\s\S]*?<\/ZoomableImage>/g, '');
  // Fix diff code blocks: ```diff toml -> treat as diff
  return html;
}

// ============================================================
// Heading anchor helpers
// ============================================================

/**
 * Build a slug from a heading text — handles Cyrillic, spaces and special chars.
 * Matches what VitePress/GitHub generate: lowercase, spaces→hyphens, strip punctuation.
 */
function headingSlug(text) {
  // Strip HTML tags from marked output
  const plain = text.replace(/<[^>]+>/g, '').trim();
  return plain
    .toLowerCase()
    .replace(/[\s\u00A0]+/g, '-')          // spaces → hyphens
    .replace(/[^\w\u0400-\u04FF\-]/g, '')  // keep letters (Latin + Cyrillic), digits, hyphens
    .replace(/^-+|-+$/g, '');              // trim leading/trailing hyphens
}

/**
 * Find the heading element that matches a given anchor string.
 * Tries: exact id match, decoded URI match, and slug-normalized match.
 */
function findHeadingByAnchor(containerEl, anchor) {
  // 1. Exact id
  let el = containerEl.querySelector('#' + CSS.escape(anchor));
  if (el) return el;

  // 2. Decoded (handles %D0%... percent-encoded Cyrillic)
  try {
    const decoded = decodeURIComponent(anchor);
    el = containerEl.querySelector('#' + CSS.escape(decoded));
    if (el) return el;
  } catch (_) { }

  // 3. Slug-normalized match against data-slug attribute
  const slug = headingSlug(decodeURIComponent(anchor).replace(/_/g, '-'));
  // VitePress uses _N suffix for numbered headings, normalise it away
  const slugBase = slug.replace(/^_?\d+-/, '');
  return containerEl.querySelector(
    `[data-slug="${CSS.escape(slug)}"], [data-slug="${CSS.escape(slugBase)}"]`
  ) || null;
}

// ============================================================
// Internal link interception
// ============================================================

/**
 * Resolve a relative or absolute doc-path href to a portal page id.
 * Returns null for external links and pure same-page #anchors.
 */
function resolvePath(base, relative) {
  const parts = base ? base.split('/') : [];
  for (const part of relative.split('/')) {
    if (part === '..') parts.pop();
    else if (part && part !== '.') parts.push(part);
  }
  return parts.join('/');
}

function resolveInternalLink(href, currentId) {
  if (!href) return null;
  // External links — leave alone
  if (/^https?:\/\/|^mailto:|^tel:/.test(href)) return null;
  // Pure same-page anchor — handled separately
  if (href.startsWith('#')) return null;

  // Strip .md extension and extract fragment
  let fragment = '';
  let path = href.replace(/\.md$/, '');
  const hashIdx = path.indexOf('#');
  if (hashIdx !== -1) {
    fragment = path.slice(hashIdx); // e.g. '#section'
    path = path.slice(0, hashIdx);
  }

  if (path.startsWith('/')) {
    // Absolute doc path e.g. /get-started/introduction
    path = path.replace(/^\//, '');
  } else {
    // Relative path — resolve against the current page's directory
    const dir = currentId.split('/').slice(0, -1).join('/');
    path = resolvePath(dir, path);
  }

  return path ? { id: path, fragment } : null;
}

function interceptContentLinks(containerEl) {
  containerEl.querySelectorAll('a[href]').forEach(a => {
    const href = a.getAttribute('href');

    // Same-page anchors — scroll to heading using slug-aware lookup
    if (href && href.startsWith('#')) {
      a.addEventListener('click', e => {
        e.preventDefault();
        const target = findHeadingByAnchor(containerEl, href.slice(1));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
      return;
    }

    // External links — open in new tab
    if (href && /^https?:\/\//.test(href)) {
      a.setAttribute('target', '_blank');
      a.setAttribute('rel', 'noopener noreferrer');
      return;
    }

    // Internal doc links
    const resolved = resolveInternalLink(href, currentPage);
    if (resolved) {
      a.setAttribute('href', '#' + resolved.id);
      a.addEventListener('click', e => {
        e.preventDefault();
        autoExpand(NAV_TREE, resolved.id);
        loadPage(resolved.id);
      });
    }
  });
}

// ============================================================
// Breadcrumb
// ============================================================
function buildBreadcrumb(id) {
  const parts = id.split('/');
  const sectionLabels = {
    'get-started': 'Начало работы',
    'applications': 'Приложения',
    'databases': 'Базы данных',
    'services': 'Сервисы',
    'knowledge-base': 'База знаний',
    'integrations': 'Интеграции',
    'api-reference': 'API',
    'troubleshoot': 'Устранение проблем',
  };
  return parts.map((p, i) => {
    const label = sectionLabels[p] || p.replace(/-/g, ' ');
    const formattedLabel = label.charAt(0).toUpperCase() + label.slice(1);
    return i < parts.length - 1
      ? `<span class="crumb">${formattedLabel}</span><span class="crumb-sep">›</span>`
      : `<span class="crumb crumb-current">${formattedLabel}</span>`;
  }).join('');
}

// ============================================================
// Auto-expand parent sections when loading a page
// ============================================================
function autoExpand(nodes, targetId, path = []) {
  for (const node of nodes) {
    if (node.id === targetId) {
      path.forEach(p => expandedSections.add(p));
      return true;
    }
    if (node.children) {
      if (autoExpand(node.children, targetId, [...path, node.id])) return true;
    }
  }
  return false;
}

// ============================================================
// Scroll active sidebar link into view
// ============================================================
function scrollActiveLinkIntoView() {
  requestAnimationFrame(() => {
    const active = document.querySelector('.nav-link.active');
    if (active) active.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  });
}

// ============================================================
// Theme toggle
// ============================================================
function initTheme() {
  const btn = document.getElementById('theme-toggle');
  const saved = localStorage.getItem('theme') || 'dark';

  function applyTheme(theme) {
    if (theme === 'light') {
      document.body.classList.add('light');
      btn.textContent = '\u2600\uFE0F'; // ☀️
      btn.title = 'Переключить на тёмную тему';
    } else {
      document.body.classList.remove('light');
      btn.textContent = '\uD83C\uDF19'; // 🌙
      btn.title = 'Переключить на светлую тему';
    }
    localStorage.setItem('theme', theme);
  }

  applyTheme(saved);

  btn.addEventListener('click', () => {
    const current = document.body.classList.contains('light') ? 'light' : 'dark';
    applyTheme(current === 'light' ? 'dark' : 'light');
  });
}

// ============================================================
// Mobile sidebar toggle
// ============================================================
function initMobileMenu() {
  const toggle = document.getElementById('menu-toggle');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('overlay');

  toggle.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    overlay.classList.toggle('visible');
  });
  overlay.addEventListener('click', () => {
    sidebar.classList.remove('open');
    overlay.classList.remove('visible');
  });
}

// ============================================================
// Full-text Search
// ============================================================

// Cache: pageId -> plain-text content
const _contentCache = new Map();
let _searchDebounce = null;
let _searchDropdown = null;

/** Collect all leaf nodes (pages) from NAV_TREE */
function collectAllLeaves() {
  const leaves = [];
  function walk(nodes) {
    for (const n of nodes) {
      if (n.children) walk(n.children);
      else leaves.push(n);
    }
  }
  walk(NAV_TREE);
  return leaves;
}

/** Load and cache the plain text of a page */
async function fetchPageText(id) {
  if (_contentCache.has(id)) return _contentCache.get(id);
  try {
    const resp = await fetch(pathToMd(id));
    if (!resp.ok) { _contentCache.set(id, ''); return ''; }
    const raw = await resp.text();
    // Strip frontmatter
    const body = stripFrontmatter(raw);
    // Strip markdown syntax for plain search
    const plain = body
      .replace(/```[\s\S]*?```/g, ' ')   // code blocks
      .replace(/`[^`]+`/g, ' ')           // inline code
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // links → text
      .replace(/[#*_~>|]/g, ' ')          // markdown chars
      .replace(/\s+/g, ' ')
      .trim();
    _contentCache.set(id, plain);
    return plain;
  } catch (_) {
    _contentCache.set(id, '');
    return '';
  }
}

/** Get a short snippet around the first match */
function getSnippet(text, query, snippetLen = 120) {
  const lower = text.toLowerCase();
  const idx = lower.indexOf(query.toLowerCase());
  if (idx === -1) return text.slice(0, snippetLen) + '…';
  const start = Math.max(0, idx - 40);
  const end = Math.min(text.length, idx + query.length + 80);
  let snippet = (start > 0 ? '…' : '') + text.slice(start, end) + (end < text.length ? '…' : '');
  // Highlight the match
  const re = new RegExp('(' + query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi');
  snippet = snippet.replace(re, '<mark>$1</mark>');
  return snippet;
}

/** Highlight matched portion in label */
function highlightLabel(label, query) {
  const re = new RegExp('(' + query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi');
  return label.replace(re, '<mark>$1</mark>');
}

/** Create or get the search results dropdown */
function getDropdown() {
  if (_searchDropdown) return _searchDropdown;
  const wrapper = document.querySelector('.header-search');
  const drop = document.createElement('div');
  drop.id = 'search-dropdown';
  drop.className = 'search-dropdown';
  wrapper.appendChild(drop);
  _searchDropdown = drop;
  return drop;
}

function hideDropdown() {
  if (_searchDropdown) {
    _searchDropdown.innerHTML = '';
    _searchDropdown.classList.remove('visible');
  }
}

/** Run full-text search and show results */
async function runFullTextSearch(query) {
  if (!query || query.length < 2) {
    hideDropdown();
    searchQuery = query;
    renderSidebar();
    return;
  }

  searchQuery = query;
  renderSidebar();

  const drop = getDropdown();
  drop.innerHTML = '<div class="search-loading">🔍 Поиск…</div>';
  drop.classList.add('visible');

  const q = query.toLowerCase();
  const allLeaves = collectAllLeaves();

  // Phase 1: label matches (instant)
  const labelMatches = allLeaves.filter(n => n.label.toLowerCase().includes(q));

  // Phase 2: content matches (async, load files in parallel batches)
  const BATCH = 20;
  const contentMatches = [];
  const labelMatchIds = new Set(labelMatches.map(n => n.id));

  // Load in batches to avoid too many simultaneous requests
  for (let i = 0; i < allLeaves.length; i += BATCH) {
    const batch = allLeaves.slice(i, i + BATCH);
    await Promise.all(batch.map(async (node) => {
      if (labelMatchIds.has(node.id)) return; // already matched by label
      const text = await fetchPageText(node.id);
      if (text.toLowerCase().includes(q)) {
        contentMatches.push({ node, text });
      }
    }));
  }

  // Render results
  if (labelMatches.length === 0 && contentMatches.length === 0) {
    drop.innerHTML = '<div class="search-empty">Ничего не найдено</div>';
    drop.classList.add('visible');
    return;
  }

  let html = '';

  if (labelMatches.length > 0) {
    html += '<div class="search-group-title">По названию</div>';
    labelMatches.slice(0, 8).forEach(node => {
      html += `
        <div class="search-result" data-id="${node.id}">
          <div class="search-result-label">${highlightLabel(node.label, query)}</div>
          <div class="search-result-path">${node.id}</div>
        </div>`;
    });
  }

  if (contentMatches.length > 0) {
    html += '<div class="search-group-title">В содержимом</div>';
    contentMatches.slice(0, 12).forEach(({ node, text }) => {
      const snippet = getSnippet(text, query);
      html += `
        <div class="search-result" data-id="${node.id}">
          <div class="search-result-label">${node.label}</div>
          <div class="search-result-snippet">${snippet}</div>
          <div class="search-result-path">${node.id}</div>
        </div>`;
    });
  }

  drop.innerHTML = html;
  drop.classList.add('visible');

  // Click handlers
  drop.querySelectorAll('.search-result').forEach(el => {
    el.addEventListener('click', () => {
      const id = el.getAttribute('data-id');
      const querySnapshot = query; // capture current query
      hideDropdown();
      document.getElementById('search-input').value = '';
      searchQuery = '';
      renderSidebar();
      autoExpand(NAV_TREE, id);
      loadPage(id).then(() => {
        // Only scroll to match for content results (not label-only matches)
        if (querySnapshot.length >= 2) {
          scrollToFirstMatch(querySnapshot);
        }
      });
    });
  });
}

/**
 * Find the first text occurrence of `query` in .doc-body,
 * wrap it in a highlight span, scroll to it, then fade the highlight out.
 */
function scrollToFirstMatch(query) {
  const docBody = document.querySelector('.doc-body');
  if (!docBody) return;

  // Walk text nodes to find the first match
  const walker = document.createTreeWalker(
    docBody,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode(node) {
        // Skip code blocks and already-highlighted spans
        const parent = node.parentElement;
        if (!parent) return NodeFilter.FILTER_REJECT;
        if (parent.closest('pre, code, .search-highlight')) return NodeFilter.FILTER_REJECT;
        return node.textContent.toLowerCase().includes(query.toLowerCase())
          ? NodeFilter.FILTER_ACCEPT
          : NodeFilter.FILTER_SKIP;
      }
    }
  );

  const textNode = walker.nextNode();
  if (!textNode) return;

  const text = textNode.textContent;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return;

  // Split the text node around the match and wrap match in a span
  const before = document.createTextNode(text.slice(0, idx));
  const match = document.createTextNode(text.slice(idx, idx + query.length));
  const after = document.createTextNode(text.slice(idx + query.length));

  const highlight = document.createElement('mark');
  highlight.className = 'search-highlight';
  highlight.appendChild(match);

  const parent = textNode.parentNode;
  parent.replaceChild(after, textNode);
  parent.insertBefore(highlight, after);
  parent.insertBefore(before, highlight);

  // Scroll to the highlight with a small offset from top
  requestAnimationFrame(() => {
    highlight.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // Fade out the highlight after 2.5s
    setTimeout(() => {
      highlight.classList.add('search-highlight-fade');
      setTimeout(() => {
        // Unwrap: replace highlight span with its text content
        if (highlight.parentNode) {
          highlight.parentNode.replaceChild(
            document.createTextNode(highlight.textContent),
            highlight
          );
        }
      }, 700);
    }, 2500);
  });
}

function initSearch() {
  const input = document.getElementById('search-input');

  input.addEventListener('input', () => {
    const query = input.value.trim();
    clearTimeout(_searchDebounce);
    _searchDebounce = setTimeout(() => runFullTextSearch(query), 250);
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      input.value = '';
      searchQuery = '';
      hideDropdown();
      renderSidebar();
    }
  });

  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.header-search')) {
      hideDropdown();
    }
  });
}

// ============================================================
// Init
// ============================================================
function init() {
  renderSidebar();
  initSearch();
  initMobileMenu();
  initTheme();

  // Load page from hash or default
  const hash = window.location.hash.slice(1);
  if (hash) {
    autoExpand(NAV_TREE, hash);
    loadPage(hash);
  } else {
    autoExpand(NAV_TREE, 'get-started/introduction');
    loadPage('get-started/introduction');
  }

  window.addEventListener('hashchange', () => {
    const id = window.location.hash.slice(1);
    if (id && id !== currentPage) {
      autoExpand(NAV_TREE, id);
      loadPage(id);
    }
  });
}

document.addEventListener('DOMContentLoaded', init);
