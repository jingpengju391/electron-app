FROM electronuserland/builder:latest

RUN npm install -g pnpm

# ENV npm_config_target=3
# ENV npm_config_runtime=napi

RUN mkdir -p /root/.npm/_prebuilds/
COPY docker/prebuilds/* /root/.npm/_prebuilds/

# Set the working directory  
WORKDIR /app  

# Copy everything to the container  
COPY . .  

# Install dependencies with pnpm  
RUN pnpm install --frozen-lockfile --shamefully-hoist  

# Assuming you have a script in package.json that calls electron-builder  
# Example: "build:linux": "electron-builder --linux"  
RUN pnpm run build:linux  

# Optionally, you can clean up unnecessary files to reduce the final image size  
# RUN rm -rf node_modules  
# Or use a multi-stage build to copy only the necessary files to a new image