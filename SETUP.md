# Setup Guide - True Image Authenticate

This guide provides all the commands needed to set up and run the True Image Authenticate project on any device.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **bun** (optional, faster alternative)
- **Git** - [Download here](https://git-scm.com/)

### Verify Installation

```bash
node --version
npm --version
git --version
```

---

## Installation Steps

### 1. Clone the Repository

```bash
git clone <repository-url>
cd true-image-authenticate
```

### 2. Install Dependencies

Choose one of the following methods:

**Using npm (recommended):**
```bash
npm install
```

**Using bun (faster alternative):**
```bash
bun install
```

---

## Running the Project

### Development Mode

Start the development server with hot-reload:

```bash
npm run dev
```

Or with bun:
```bash
bun run dev
```

The application will be available at: **http://localhost:5173**

### Build for Production

Create an optimized production build:

```bash
npm run build
```

Or with bun:
```bash
bun run build
```

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

Or with bun:
```bash
bun run preview
```

### Linting

Check code quality and style:

```bash
npm run lint
```

---

## Backend Setup (Deepfake Detection System)

This frontend application requires a backend API server to be running for image analysis. The backend is a Python-based deepfake detection system.

### Prerequisites for Backend

- **Anaconda or Miniconda** - [Download here](https://docs.conda.io/en/latest/miniconda.html)
- **NVIDIA GPU with CUDA** (recommended for faster inference) - [CUDA Toolkit](https://developer.nvidia.com/cuda-downloads)
- **Python 3.9+**

### Step 1: Create Conda Environment

Open **Anaconda Prompt** (Windows) or **Terminal** (Linux/Mac) and navigate to the backend directory:

```bash
cd ../deepfake-detection-system
```

Create a new Conda environment named `deepfake_env`:

```bash
conda create -n deepfake_env python=3.9 -y
```

### Step 2: Activate the Environment

```bash
conda activate deepfake_env
```

> **Note**: You need to activate this environment every time you want to run the backend server.

### Step 3: Install PyTorch with CUDA Support

Check your CUDA version first:
```bash
nvidia-smi
```

Install PyTorch with CUDA support (adjust CUDA version as needed):

**For CUDA 11.8:**
```bash
conda install pytorch torchvision torchaudio pytorch-cuda=11.8 -c pytorch -c nvidia -y
```

**For CUDA 12.1:**
```bash
conda install pytorch torchvision torchaudio pytorch-cuda=12.1 -c pytorch -c nvidia -y
```

**For CPU only (slower, not recommended):**
```bash
conda install pytorch torchvision torchaudio cpuonly -c pytorch -y
```

> Visit [PyTorch Installation Guide](https://pytorch.org/get-started/locally/) to get the exact command for your system.

### Step 4: Install Backend Dependencies

Install required Python packages:

```bash
pip install -r requirements.txt
```

If `requirements.txt` is incomplete, install manually:

```bash
pip install flask flask-cors python-dotenv requests pillow numpy
pip install timm albumentations opencv-python-headless tqdm scikit-learn pandas matplotlib pyyaml
```

### Step 5: Configure API Credentials (Optional)

The backend uses an external AI detection engine. To configure:

1. Copy the example environment file:
   ```bash
   copy .env.example .env
   ```
   (On Linux/Mac: `cp .env.example .env`)

2. Edit `.env` and add your API credentials:
   ```env
   ENGINE_API_USER=your_api_user_here
   ENGINE_API_SECRET=your_api_secret_here
   ```

> **Note**: The system works without API credentials but with reduced accuracy.

### Step 6: Verify Backend Setup

Test if PyTorch and CUDA are properly configured:

```bash
python -c "import torch; print(f'PyTorch: {torch.__version__}'); print(f'CUDA Available: {torch.cuda.is_available()}')"
```

Expected output:
```
PyTorch: 2.x.x
CUDA Available: True
```

### Step 7: Start the Backend Server

Start the Flask API server:

```bash
python api_server.py
```

Or use the batch file (Windows):
```bash
start_api_server.bat
```

The backend will be available at **http://localhost:5000**

You should see output like:
```
 * Running on http://127.0.0.1:5000
 * Running on http://192.168.x.x:5000
```

### Step 8: Test the Backend

Open a new terminal and test the API:

```bash
python test_api_connection.py
```

Or manually with curl:
```bash
curl http://localhost:5000/api/health
```

---

## Running Both Frontend and Backend

### Terminal 1 - Backend:
```bash
cd deepfake-detection-system
conda activate deepfake_env
python api_server.py
```

### Terminal 2 - Frontend:
```bash
cd true-image-authenticate
npm run dev
```

Now open **http://localhost:5173** and you should be able to analyze images!

---

## Backend Directory Structure

```
deepfake-detection-system/
├── api_server.py              # Flask API server
├── requirements.txt           # Python dependencies
├── .env.example              # Environment variables template
├── inference/                # Inference logic
│   ├── predict_image.py     # Image prediction
│   ├── engine_api.py        # External API integration
│   └── decision.py          # Decision logic
├── models/                   # Model architectures
│   ├── xception/
│   ├── efficientnet/
│   └── mesonet/
└── saved_models/             # Trained model weights
```

---

## Environment Variables (Frontend)

Create a `.env` file in the **frontend** root directory to configure API endpoints:

```env
VITE_API_URL=http://localhost:5000
```

---

## Project Structure

```
true-image-authenticate/
├── src/
│   ├── components/        # React components
│   │   ├── ui/           # UI components (shadcn)
│   │   ├── Hero.tsx
│   │   ├── AnalysisSection.tsx
│   │   └── ...
│   ├── services/         # API services
│   ├── pages/            # Page components
│   └── main.tsx          # Application entry point
├── public/               # Static assets
├── package.json          # Dependencies and scripts
└── vite.config.ts        # Vite configuration
```

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run build:dev` | Build in development mode |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

---

## Troubleshooting

### Port Already in Use

If port 5173 is already in use, you can specify a different port:

```bash
npm run dev -- --port 3000
```

### Dependencies Installation Issues

If you encounter issues during installation:

1. Delete `node_modules` and lock files:
   ```bash
   rm -rf node_modules package-lock.json
   ```

2. Clear npm cache:
   ```bash
   npm cache clean --force
   ```

3. Reinstall dependencies:
   ```bash
   npm install
   ```

### Backend Connection Issues

Ensure:
1. The backend server is running
2. Backend URL is correctly configured
3. No CORS issues (backend should allow frontend origin)

---

## Technology Stack

- **React 18** - UI framework
- **TypeScript** - Type-safe JavaScript
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Component library
- **Framer Motion** - Animation library
- **Lucide React** - Icon library

---

## Quick Start (All-in-One)

For a complete setup from scratch:

```bash
# Clone the repository
git clone <repository-url>
cd true-image-authenticate

# Install dependencies
npm install

# Start development server
npm run dev
```

Then open **http://localhost:5173** in your browser.

---

## Production Deployment

### Build

```bash
npm run build
```

This creates a `dist/` folder with optimized production files.

### Deployment Options

1. **Static Hosting** (Vercel, Netlify, GitHub Pages):
   - Deploy the `dist/` folder
   - Configure environment variables on the hosting platform

2. **Docker** (if Dockerfile is available):
   ```bash
   docker build -t true-image-authenticate .
   docker run -p 3000:3000 true-image-authenticate
   ```

3. **Manual Server**:
   - Copy `dist/` folder to your web server
   - Configure web server to serve the static files

---

## Support

For issues or questions:
1. Check the [README.md](./README.md) for project overview
2. Review the code comments and documentation
3. Check GitHub issues (if repository is public)

---

## License

[Specify your license here]
