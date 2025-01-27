#!/bin/bash

# Define variables
LOCAL_FOLDER="./build"                       # Local folder to deploy
REMOTE_USER="ubuntu"
REMOTE_HOST="api.gaming.veerastage.com"
REMOTE_KEY="~/Downloads/veera.pem"
REMOTE_TMP_DIR="/home/ubuntu/frontend"
REMOTE_TARGET_DIR="/var/www/react-app"

# Step 1: Ensure the local folder exists
if [ ! -d "$LOCAL_FOLDER" ]; then
  echo "Local folder '$LOCAL_FOLDER' does not exist. Exiting."
  exit 1
fi

# Step 2: Clean the remote dia-web folder
echo "Cleaning the remote dia-web folder..."
ssh -i $REMOTE_KEY $REMOTE_USER@$REMOTE_HOST << EOF
  echo "Removing files from $REMOTE_TMP_DIR..."
  rm -rf $REMOTE_TMP_DIR/*
  echo "Remote dia-web folder cleaned."
EOF

# Step 3: SCP files to the remote server
echo "Transferring files to the remote server..."
scp -i $REMOTE_KEY -r $LOCAL_FOLDER/* $REMOTE_USER@$REMOTE_HOST:$REMOTE_TMP_DIR
if [ $? -ne 0 ]; then
  echo "SCP failed. Exiting."
  exit 1
fi
echo "Files successfully transferred to $REMOTE_TMP_DIR on the remote server."

# Step 4: SSH into the remote server and manage files
echo "Connecting to the remote server..."
ssh -i $REMOTE_KEY $REMOTE_USER@$REMOTE_HOST << EOF
  echo "Removing files from $REMOTE_TARGET_DIR..."
  sudo rm -rf $REMOTE_TARGET_DIR/*
  echo "Files removed from $REMOTE_TARGET_DIR."

  echo "Moving files from $REMOTE_TMP_DIR to $REMOTE_TARGET_DIR..."
  sudo mv $REMOTE_TMP_DIR/* $REMOTE_TARGET_DIR/
  echo "Files successfully moved to $REMOTE_TARGET_DIR."

  echo "Restarting the web server..."
  sudo systemctl restart nginx
  echo "Web server restarted."
EOF

echo "Deployment completed successfully!"
