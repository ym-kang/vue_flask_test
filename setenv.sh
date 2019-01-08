if [ ! -d ./.venv ]; then
    virtualenv -ppython3 .venv
    source .venv/bin/activate
    pip -r requirements.txt
else
    source .venv/bin/activate
fi