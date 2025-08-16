# Link Tree Deployment Guide

## Checking Available Versions

To see the correct version IDs for each environment, you need to use the worker name that matches the environment configuration in `wrangler.toml`:

### Production Environment
```bash
npx wrangler versions list --name linktree
```

### Development Environment
```bash
npx wrangler versions list --name linktree-development
```

**Note**: The worker names should match the `name` field specified in each environment section of your `wrangler.toml` file.

## Deployment Steps

### For Development Environment

1. **Upload a new version** (creates version but doesn't deploy):
   ```bash
   nx upload:version:dev link-tree --tag="feature-name" --message="Description of changes"
   ```

2. **Check the version ID** that was created:
   ```bash
   npx wrangler versions list --name linktree-development
   ```

3. **Deploy the version** using the version ID from step 2:
   ```bash
   nx deploy:version:dev link-tree -- --version-id <version-id-from-step-2> --message "Description here"
   ```

### For Production Environment

Production deployments are **automated**. A Worker automatically uploads and deploys the latest commit from the `master` branch.

**No manual deployment needed** - just merge your changes to the `master` branch and the production environment will be updated automatically.

To check the current production deployment:
```bash
npx wrangler versions list --name linktree
```

## Important Notes

- Only use `--` when deploying a new version (to pass flags to the underlying wrangler command)
- For upload commands, flags are passed directly to nx without `--`
- Version IDs are environment-specific - a version uploaded to one environment won't be available in another
- The `upload` step builds and uploads code but doesn't make it live
- The `deploy` step makes a specific version live by routing traffic to it
