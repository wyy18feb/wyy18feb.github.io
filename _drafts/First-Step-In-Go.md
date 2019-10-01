# Introduction

This is my learning record of [Programming with Google Go](https://www.coursera.org/specializations/google-golang) on [Coursera](https://coursera.org). Here I take notes of the courses.

For details of documentation, please visit [golang.org/doc](https://golang.org/doc).

# Getting Started with Go

## Module 1: Getting Started with Go

Go is a high-level language(others like C, C++, Java, Python, etc.). Go is a good compromise between compiled and interpreted type of language.

### M1.1.1: Advantages of Go

1. Code runs fast (Go is a compiled language)
2. Garbage collection (also has the feature of interpreted languages)
3. Simpler objects
4. Concurrency is efficient

### M1.1.2: Objects

Go is (weakly) object-oriented. It implements objects but they have fewer features than in another objected-oriented language like Python or Java or something like that.

Go uses **struct** with associated methods.

Go has simplified implementation of classes which results in:
- no inheritance
- no constructors
- no generics

### M1.1.3: Concurrency

Concurrency is the management of multiple tasks at the same time. Concurrent programming enables parallelism which should realize the functions as follows:
- Management of task execution (**Goroutine**)
- Communication between tasks (**Channel**)
- Synchronization between tasks (**Select**)

### M1.2.1: Installing Go

Download the Go tools from [golang.org](https://golang.org)

### M1.2.2: Workspaces & Packages

Directory hierarchy (recommened, **not enforced**):
- src (contains source code files)
- pkg (contains packages libraries)
- bin (contains executables)

The workspace is defined by the environment variable **GOPATH**.

Packages are groups of related source files, and each one can be imported by other packages which enables software reuse. In a go file, it's defined in the fist line.

```go
// src/lib/user.go
package lib

import "fmt"

func Login() {
	fmt.Println("UserLogin")
}

```

There must be one package called **main** which shoud be built and it generated an executable program. In the main package, there must be a function called "main".

```go
// src/main.go
package main

import (
	"fmt"
	"lib"
)

func main() {
	lib.Login()
}

```

### M1.2.3: Go tool

```bash
go build [a list of packages or *.go files]  # compiles the program
go doc  # prints documentation for a package
go fmt  # formats source code files
go get  # downloads packages and installs them
go run  # compiles .go files and runs the executable
go test  # runs tests using files ending in "_test.go"
```

### M1.3.1: Variables

Viariables are data stored in memory and must have a name and a type. All variablles must have declarations. For example:

```go
var x int
```

### M1.3.2: Variable Initialization

Define an alias for a type:

```go
type Celsius float64
type IDnum int

var temp Celsius
var pid IDnum
```

Initialize variables:

```go
// initialize in the declaration
var x int = 100  // tell it that x must be an integer
var x = 100  // it will infer the type which you may not want

// initialize after the declaration
var x int  // uninitialized variables have a zero value: x = 0
x = 100

//declare and assign
x := 100  // 100 looks like an integer, so let x be an int and then assign it with 100
```

## Module 2: Basic Data Types

## Module 3: Composite Data Types

## Module 4: Protocols and Formats