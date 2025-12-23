# Настройка SSH ключа для репозитория

## Текущая настройка

В файле `.git/config` настроено использование SSH ключа через `core.sshCommand`.

## Вариант 1: Использование ключа напрямую (текущая настройка)

Если ключ находится в стандартном месте `~/.ssh/id_rsa`, настройка уже применена.

Если ключ имеет другое имя (например, `~/.ssh/github_key`), измените в `.git/config`:
```
sshCommand = ssh -i ~/.ssh/github_key -o IdentitiesOnly=yes
```

## Вариант 2: Использование SSH config

Если ключ настроен в `~/.ssh/config` через хост, можно использовать:

1. Создайте или отредактируйте `~/.ssh/config`:
```
Host github-vdn
    HostName github.com
    User git
    IdentityFile ~/.ssh/your_key_name
    IdentitiesOnly yes
```

2. Измените URL в `.git/config`:
```
[remote "origin"]
    url = git@github-vdn:vaskes79/vdn.git
```

3. Удалите или закомментируйте `core.sshCommand` в `.git/config`, так как хост из config будет использоваться автоматически.

## Проверка настройки

Проверьте подключение:
```bash
git fetch origin
```

Если всё настроено правильно, команда выполнится без ошибок.
