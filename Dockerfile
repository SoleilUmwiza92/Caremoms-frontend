# ===============================
# 1. BUILD STAGE (Node)
# ===============================
FROM node:18-alpine AS build

WORKDIR /app

# Install dependencies from lockfile for reproducible builds
COPY package*.json ./
RUN npm ci

# Copy source code
COPY . .

# Build-time environment variables
ARG REACT_APP_API_URL
ARG REACT_APP_SUPABASE_URL
ARG REACT_APP_SUPABASE_ANON_KEY

# Pass ARG → ENV (React will embed them at compile time)
ENV REACT_APP_API_URL=$REACT_APP_API_URL
ENV REACT_APP_SUPABASE_URL=$REACT_APP_SUPABASE_URL
ENV REACT_APP_SUPABASE_ANON_KEY=$REACT_APP_SUPABASE_ANON_KEY

# Build optimized production bundle
RUN npm run build


# ===============================
# 2. RUNTIME STAGE (NGINX)
# ===============================
FROM nginx:alpine

# Remove default config
RUN rm -f /etc/nginx/conf.d/default.conf

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy build output
COPY --from=build /app/build /usr/share/nginx/html

# Ensure permissions (not strictly required but good practice)
RUN chmod -R 755 /usr/share/nginx/html

EXPOSE 80

# Run nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
