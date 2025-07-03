# 🚀 Cliente NestJS para gRPC (HubSpot Notification)

Este proyecto es un **cliente NestJS mínimo** que consume un servicio gRPC (por ejemplo, tu microservicio en Go que envía notificaciones por HubSpot).

---

## 📦 Requisitos

- Node.js v18+
- npm
- Nest CLI (`npm install -g @nestjs/cli` si no lo tienes)
- Acceso al archivo `.proto` de tu servicio
- El servicio gRPC debe estar corriendo (local o vía túnel como `ngrok`)

---

## 🧩 Instalación

Clona el repositorio y entra a la carpeta:

```bash
git clone https://github.com/abrahamsantos-developer/grpc-nest-minimal.git
cd grpc-nest-minimal
npm install
```

Instala las dependencias necesarias

```bash
npm install --save-dev @grpc/proto-loader @grpc/grpc-js
```

*** Ya están incluidas en este proyecto, pero si clonas desde cero y faltan, instálalas

---

## ⚙️ Configuración

Revisa el archivo:

```bash
src/app.module.ts
```

Allí se configura el cliente gRPC con `ClientsModule.register`.

### 🔁 Cambia la URL del servicio

Por defecto, el cliente apunta a `localhost:50051`.

Si estás usando un túnel (como `ngrok`), **modifica esto:**

```ts
url: 'dns:///<TU_HOST>:<PUERTO>',
```

Por ejemplo:

```ts
url: 'dns://4.tcp.us-cal-1.ngrok.io:10298',
```

> 💡 Importante: asegúrate que `ngrok` esté corriendo, y el servicio gRPC esté activo en ese puerto.

---

## ▶️ Ejecutar en modo watcher

```bash
npm run start:dev
```

Esto compilará y observará los archivos (`tsc --watch` + `nest start`).

---

## 📬 Consumir el servicio gRPC

Ya viene configurado un ejemplo simple en `AppController` con esta ruta:

```method
GET /
```

Internamente se construye un payload y se hace la llamada a:

```ts
this.notificationService.SendNotification(payload)
```

El resultado se imprime en consola y también se devuelve como respuesta.

Puedes cambiar el `payload` en `app.controller.ts`.

---

## 🧪 Debug y Logs

Si ves un error como:

```error
14 UNAVAILABLE: No connection established.
```

Revisa:

- ¿El servicio gRPC está corriendo?
- ¿Estás apuntando bien al host + puerto?
- ¿El `.proto` fue cargado correctamente en `app.module.ts`?

---

## 📂 Estructura

```estructura
grpc-nest-minimal/
├── proto/
│   ├── common/
│   │   └── common.proto
│   └── notification/
│       └── notification.proto
├── src/
│   ├── app.controller.ts
│   ├── app.module.ts
│   └── main.ts
├── package.json
└── tsconfig*.json
```

---

## 📌 Notas

- El proyecto **no sube `node_modules` ni `/dist`** gracias al `.gitignore`.
- Usa `@nestjs/microservices` para crear el cliente gRPC.
- Si lo clonas desde cero, solo necesitas `npm install` y `npm run start:dev`.

---
