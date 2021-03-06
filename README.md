# JsOS-CLI
Command line tools for `JsOS`.

<a href="https://www.npmjs.com/package/jsos-cli"><img src="https://static.npmjs.com/images/logo.svg" width="64"/></a>

## Installation

```sh
npm i -g jsos-cli
```

## Usage

```text
USAGE: jsos <command> [<args>]

Commands:
  start         Quickly start JsOS in VM using current directory
  watch         Watch current directory and automatically restart VM
  pack          Package specified directory into ramdisk bundle
  run           Run JsOS in VM using specified ramdisk bundle
  show          Print VM output or log
  mkimg         Easily create a disk image for use with JsOS
  mkiso         Easily create a bootable ISO image
  help          Print this usage help
```

## Getting Started

To setup a project simply clone `JsOS` repository

```sh
git clone https://github.com/JsOS-Team/JsOS
cd JsOS
npm i
```

Run project in QEMU VM:

```sh
jsos start
```

Or let it watch directory for changes and restart QEMU automatically:

```sh
jsos watch
```

## Commands

`start`, `watch` and `run` commands are very similar and have pretty much the same list of arguments. They all launch JsOS in the QEMU VM.

```sh
USAGE: jsos start [<args>]
(Quickly start JsOS VM using current directory)

Arguments:
  --net         Enable network (value can be "none", "user", "tap" or
                "bridge", defaults to "user")
  --netdump     Save network activity to a file
  --kvm         Enable Linux KVM (much faster virtualization)
  --pcspk       Enable PCSpeaker emulation (if you haven't native)
  --usb         Enable usb (ehci) device emulation (for testing)
  --curses      Use text-mode graphics
  --port        Redirect TCP/UDP connections on the host port to the JsOS
  --append      Append string to JsOS command line
  --dry-run     Test input but do not launch the VM
  --verbose     Output extra info like VM command line
  --virtio-rng  Enable VIRTIO-RNG entropy source for the JsOS
  --nographic   Disable graphics, run in command line mode
  --kernel      Specify custom kernel binary file to use
  --local       Download the kernel locally (i.e. in the module's directory)
  --pcspk       Enable PCSpeaker emulation
  --usb         Enable USB EHCI device emulation
```

`pack` packages directory into ramdisk/initrd bundle. This is useful if you'd like to ship compiled bundle somewhere and don't want to run it locally.

```sh
USAGE: jsos pack [<args>] <directory>
(Package specified directory into ramdisk bundle)

  <directory>   Directory to package

Arguments:
  --list-files  List packaged files only
  --ignore      Add file ignore pattern
  --entry       Set entry point import/require string (defaults to "/")
  --add-dir     Add a directory into the package (format: <path> or <path>:<package-path>)
```

`mkimg` creates a FAT disk image for use with JsOS. On some systems, you may need to use root/administrator privileges. Depends on qemu-img on all platforms, hdiutil and diskutil on macOS (builtin), losetup and mkfs.msdos on Linux (included on most distributions), and diskpart on Windows (bulitin).

```sh
USAGE: jsos mkimg [<args>] <filename>
(Easily create a disk image for use with JsOS)

  <filename>    The filename for the newly created disk image including the extension,
                default to "disk.img"

Arguments:
  --size        Size of the new image, defaults to 1 gigabyte. See `qemu-img --help` for sizes.
                Must be >= 33792 kb (~33 mb)
  --label       Label of the new image, defaults to "JSOS"
```

## Environment Variables
While there is a [proposal](https://github.com/runtimejs/runtime/issues/134) to add envirionment variables from the command line, there is currently no officially supported process for passing them into a runtime instance. However, there is a work around that will allow the passing of Kernel Command Line arguments instead.

```sh
jsos run --append <your env args> initrd
```

To access this variable in your code use the following:

```sh
const wholeString = __SYSCALL.getCommandLine();
const arrayOfArguments = wholestring.split(' ');
arrayOfArguments[i]; // where i is the index of your argument in the array
```

## Completion

Enables tab-completion for all commands.

```sh
jsos completion >> ~/.bashrc
jsos completion >> ~/.zshrc
```

## License

Apache License, Version 2.0
