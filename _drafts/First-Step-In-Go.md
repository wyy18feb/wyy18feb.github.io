---
layout: post
title: "First Step in Go"
---


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

### M2.1.1: Pointers

**Pointer** is an address to data in memory.

````go
var x int = 1
var y int
var ip *int  // ip is pointer to int

ip = &x  // ip now points to x
y = *ip  // y is now 1
```

The **new()** function creates a variable and returns the pointer to the variable.

```go
ptr := new(int)
*ptr = 3
```

### M2.1.2: Variable Scope

**Block** is a sequence of declarations and statements within matching brackets, **{}**， including:
- Universe block (all Go source)
- Package block (all source in a package)
- File block (all source in a file)
- Function block (all codes in a function)
- Other block ("if", "for", "switch")

**Variable Scope** is the place in code where a variable can be accessed.

The scope of a variable is the block where it's exactly in and the sub-blocks where are within it.

### M2.1.3: Deallocating Memory

When a variable is no longer needed, it should be deallocated.

**Stack** is dedicated to function calls:
- Local variables are stored here
- Deallocated after function completes

**Heap** is persistent:
- Data on the heap must be deallocated when it is done being used
- In most compelled languages, this is done **manually**
- Error-prone, but fast

### M2.1.4: Garbage Collection

Sometimes it's hard to determine when a variable is no longer in use:

```go
func foo() *int {
    x := 1
    return &x
}

func main() {
    var y *int
    y = foo()
    fmt.Printf("%d", *y)
}
```

In interpreted languages, **Garbage Collection** is done by the **Interpreter**:
- Java Virtual Machine
- Python Interpreter

**Go** is unique. It is a **compiled language** which **enables garbage collection**. The **Go Compiler** determines **stack or heap**. The Garbage Collection runs in the background. It is easier for programmers however It slows down a little bit.

### M2.2.1: Comments, Printing, Integers

Comments:

```go
// This is a single-line comment.
/*
    This is a block comment.
 */
```

Printing:

```go
import fmt

name := "wyy18feb"
fmt.Printf("Hello, %s...", name)
```

Integers:

Different lengths and signs:
- int8, int16, int32, int64
- uint8, uint16, uint32, uint64

### M2.2.2: Ints, Floats, Strings

Type Conversion is not always successful:

```go
var x int32 = 1
var y int64 = 2
x = y  // wrong
x = int32(y)  // correct
```

Floating Point:
- float32 (6 digits of precision)
- float64 (15 digits of precision)

Strings are often meant to be printed. ASCII is 8-bit long which is for presenting 128 characters.

Unicode is a 32-bit character code. UTF-8 is variable length. The default in Go is **UTF-8**.

### M2.2.3: String Packages

Unicode Package:

```go
import unicode

// to test categories of runes
unicode.IsDigit(r rune)
unicode.IsSpace(r rune)
unicode.IsLetter(r rune)
unicode.IsLower(r rune)
unicode.IsPunct(r rune)  // ,.:"'_

//to perform conversions
unicode.ToUpper(r rune)
unicode.ToLower(r rune)
```

Strings Package:

```go
import strings

strings.Compare(a string, b string)
strings.Contains(s string, substr string)
strings.HasPrefix(s string, prefix string)
strings.Index(s string, substr string)

// Strings are immutable, but modified strings are returned.
strings.Replace(s string, oldstr string, newstr string, n int)
strings.ToLower(s string)
strings.ToUpper(s string)
strings.TrimSpace(s string)
```

Strconv Package:

```go
import strconv

strconv.Atoi(s string)
strconv.Itoa(s string)
strconv.FormatFloat(f float, fmt byte, prec int, bitSize int)
strconv.ParseFloat(s string, bitSize int)
```

### M2.3.1: Constants

Constants are expressions whose value is known at compile time. Its type is inferred from righthand side.

```go
const x = 1.3
const (
    y = 4
    z = "Hi"
)
```

Iota generates a set of **related but distinct** constants. Constants must be different but **actual value is not important**.

```go
type Grade int
const (
    A Grade = iota
    B
    C
    D
)
```

### M2.3.2: Control Flow

Condition Flow:

```go
if x > 5 {
    x += 2
} else {
    x -= 2
}
```

For Loops:

```go
for i := 0; i < 10; i++ {
    fmt.Println(i)
}

i = 0
for i < 10 {
    fmt.Println(i)
    i++
}

for {
    fmt.Println("Hi")
}
```

Switch / Case:

```go
switch x {
    case 1:
        fmt.Println("case1")
    case 2:
        fmt.Println("case1")
    default:
        fmt.Println("default")
}
```

### M2.3.3: Control Flow, Scan

Tagless Switch:

```go
switch {
    case x > 1:
        fmt.Println("case1")
    case x < -1:
        fmt.Println("case2")
    default:
        fmt.Println("default")
}
```

Break and Continue:

```go
i := 0
for i < 10 {
    i++
    if i == 5 {
        break
    }
    fmt.Println(i)
}

i := 0
for i < 10 {
    i++
    if i == 5 {
        continue
    }
    fmt.Println(i)
}
```

Scan:

```go
var appleNum int
num, err := fmt.Scan(&appleNum)
fmt.Println(appleNum)
```

## Module 3: Composite Data Types

### M3.1.1: Arrays

## Module 4: Protocols and Formats