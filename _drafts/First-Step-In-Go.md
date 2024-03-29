---
layout: post
title: "First Step in Go"
---


# Introduction

> Go is an open source programming language that makes it easy to build simple, reliable, and efficient software.

![Go](https://golang.org/lib/godoc/images/home-gopher.png)

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

Arrays are fixed-length series of elements of a chosen type. Elements are initialized to zero value.

```go
var x [5]int
x[0] = 2

// pre-defined with values
var x [5]int = [5]{1, 2, 3, 4, 5}

// ... for size in array literal infers size from number of initializers
x := [...]int{1, 2, 3, 4}
```

Iterating through Arrays using for loops:

```go
x := [3]{1, 2, 3}
for i, v range x {
    fmt.Println(i, v)  // i is index, v is value
}
```

### M3.1.2: Slices

Slices are a "window" on an underlying array. A slice has 3 properties:
- Pointer (the start of the slice)
- Length (the number of elements in the slice)
- Capacity (the maximum number of elements)

```go
arr := [...]string{"a", "b", "c", "d", "e", "f", "g"}
s1 := arr[1:3]  // b, c
s2 := arr[2:5]  // c, d, e
fmt.Println(len(s1), cap(s1)) // 2, 6
fmt.Println(len(s2), cap(s2)) // 3, 5

// slices are the references of the array
s1[1] = "z"  // change on the slice results in change on the array
fmt.Println(s1[1], s2[0], arr[2])  // z, z, z
```

Slice Literals creates the underlying array and creates a slice to reference it. Slice points to the start of the array, length is capacity.

```go
sli := []int{1, 2, 3}  // nothing in the brackets, so it must be a slice
```

### M3.1.3: Variable Slices

**Make()** function creates a slice (and array).

```go
sli := make([]int, 10)  // length = capacity = 10
sli := make([]int, 10, 15)  // length = 10, capacity = 15
```

**Append()** function adds elements to the end of a slice and increases the size of it.

```go
sli := make([]int, 0, 3)  // length = 0, capacity = 3
sli = append(sli, 100)  // length = 1, capacity = 3
```

### M3.2.1: Hash Tables

Hash Table contains **key/value** pairs. Each value is associated with a unique key. **Hash function** is used to compute the **slot** for a key.

![Hash Table in Go](https://miro.medium.com/max/315/1*FH2BzH1l5D7C18Fd7U0JVQ.png)

Hash Tables may have collisions but usually very rare.

### M3.2.2: Maps

Maps are implementation of a hash table.

```go
var idMap map[string]int
idMap = make(map[string]int)  // make an empty map

idMap := map[string]int {"wyy18feb": 123}  // initialize a map

fmt.Println(idMap["wyy18feb"])  // get the value by key, returns zero if key is not present

idMap["tale"] = 456  // add or update a key/value pair

delete(idMap, "tale")  // delete a key

id, p := idMap["wyy18feb"]  // id is value, p is presence of key
fmt.Println(id, p)  // 123, true
```

Iterating through a Map using for loops:

```go
for key, value := idMap {
    fmt.Println(key, value)
}
```

### M3.3.1 Structs

```go
type Person struct {
    name string
    addr string
    phone string
}
var p1 Person

// initialize a struct
p1 := new(Person)  // initialize fields to zero
p1 := Person{name: "wyy18feb", addr: "a st.", phone: "123"}  // initialize using a struct literal

// access a struct
p1.name = "wyy18feb"
x := p1.addr
```

## Module 4: Protocols and Formats

### M4.1.1: RFCs

**Requests for Comments** (RFC) are definitions of Internet protocols and formats:
- HTML (1866)
- URI (3986)
- HTTP (2616)

Protocol Packages:

```go
import (
    "net"
    "net/http"
)

resp, err := http.Get("wyy18feb.github.io")
resp, err := net.Dial("tcp", "wyy18feb.github.io:443")
```

### M4.1.2: JSON

JSON Properties:
- All Unicode
- Fairly compact representation
- Types can be combined recursively

JSON Marshalling && Unmarshalling:

```go
import "json"

// Here the properties must be first captitalized
// or the json.Marshal cannot export them
type Person struct {
    Name  string  `json:"name"`
    Addr  string  `json:"addr"`
    Phone string  `json:"phone"`
}

p1 := Person{Name: "wyy18feb", Addr: "a st.", Phone: "123"}
barr, err := json.Marshal(p1)
if err != nil {
    fmt.Println("error:", err)
}
fmt.Printf("%s\n", barr)  // {"name":"wyy18feb","addr":"a st.","phone":"123"}

var p2 Person
err = json.Unmarshal(barr, &p2)
if err != nil {
    fmt.Println("error:", err)
}
fmt.Printf("%s\n", p2)  // {wyy18feb a st. 123}
```

### M4.2.1: File Access, ioutil

Files:
- Linear access, not random access (mechanical delay)
- Basic operations:
	1. Open
	2. Read
	3. Write
	4. Close
	5. Seek

Ioutil Package:

```go
import "io/ioutil"

dat, err := ioutil.ReadFile("test.txt")  // large files may cause a problem
err := ioutil.WriteFile("outfile.txt", dat, 0777)
```

### M4.2.2: File Access, os

Os Package:

```go
import os

// read 10 bytes from the file dt.txt
f, err := os.Open("dt.txt")
barr := make([]byte, 10)
nb, err := f.Read(barr)
f.Close()

// create a file and write something into it
f, err := os.Create("outfile.txt")
barr := []byte{1, 2, 3}
nb, err := f.Write(barr)
nb, err := f.WriteString("Hi")
f.Close()
```

# Functions, Methods, and Interfaces

## Module 1: Functions and Organizations

### M1.1.1: Why Use Functions?

A function is a set of instructions with a name.
- Reusability
- Abstraction

### M1.1.2: Function Parameters and Return Values

```go
func foo() {
    fmt.Println("Hello, World")
}

func foo(x int, y int) {
    fmt.Println(x*y)
}

func foo(x int) int {
    return x + 1
}

func foo(x int) (int, int) {
    return x, x + 1
}
```

### M1.1.3: Call by Value, Reference

Call by Value:

```go
func foo(y int) {
    y = y + 1
}

func main() {
    x := 2
    foo(x)
    fmt.Println(x)  // 2 not changed
}
```

Call by Reference:

```go
func foo(y *int) {
    *y = *y + 1
}

func main() {
    x := 2
    foo(&x)
    fmt.Print(x)  // 3 changed
}
```

Comparison:

|Call by|Copying Time|Data Encapsulation|
|----|----|----|
|Value|depends on the size|only changed in the function|
|Reference|no need to copy|may be changed|

### M1.1.4: Passing Arrays and Slices

Passing Array Arguments:

```go
func foo(x [3]int) int {
    return x[0]
}

func main() {
    a := [3]int{1, 2, 3}
    fmt.Println(foo(a))
}
```

Passing Array Pointers:

```go
func foo(x *[3]int) int {
    (*x)[0] = (*x)[0] + 1
}

func main() {
    a := [3]int{1, 2, 3}
    foo(&a)
    fmt.Println(a)
}
```

**Passing Slices**:

Slices contain a pointer to the array. Passing a slice copies the pointer.

```go
func foo(sli []int) {
    sli[0] = sli[0] + 1
}

func main() {
    s := []int{1, 2, 3}
    foo(s)
    fmt.Println(s)
}
```

### M1.2.1: Well-Written Functions

- Understandability
- Debugging Principles:
	1. Function is written incorrectly
	2. Data that the function uses is incorrect
- Supporting Debugging:
	1. Functions need to be understandable
	2. Data needs to be tracable

### M1.2.2: Guidelines for Functions

- Function Naming
- Functional Cohesion (only one operation)
- Few Parameters
- Reducing Parameter Number

### M1.2.3: Function Guidelines

- Function Complexity
- Function Length
- Control-flow Complexity
- Partitioning Conditionals

## Module 2: Function Types

### M2.1.1: First-Class Values

Functions are first-class.

- Variables as Functions

```go
func incFn(x int) int {
    return x + 1
}

func main() {
    var funcVar func(int) int
    funcVar = incFn  // declare a variable as a func
    fmt.Println(funcVar(0))
}
```

- Functions as Arguments

```go
func applyIt(foo func(int) int, val int) int {
    return foo(val)
}

func inc(x int) int {return x + 1}
func dec(x int) int {return x - 1}

func main() {
    fmt.Println(applyIt(inc, 1))  // 2
    fmt.Println(applyIt(dec, 1))  // 0
}
```

- Anonymous Functions

```go
func applyIt(foo func(int) int, val int) int {
    return foo(val)
}

func main() {
    fmt.Println(applyIt(func (x int) int {return x - 1}, 1))  // 0
}
```

### M2.1.2: Returning Functions

```go
func MakeDistOrigin(ox float64, oy float64) func (float64, float64) float64 {
    return func (tx float64, ty float64) float64 {
        return math.Sqrt(math.Pow(tx-ox, 2) + math.Pow(ty-oy, 2))
    }
}

func main() {
    var foo func(float64, float64) float64
    foo = MakeDistOrigin(0, 0)
    fmt.Println(foo(1, 2))  // 2.236
}
```

**Closure**:

When functions are passed/returned, their environment comes with them.

```go
func MakeDistOrigin(ox, oy float64) func (float64, float64) float64 {
    // Here ox and oy are in the closure of fn
    fn := func (tx, ty float64) float64 {
        // we can still get access of ox and oy
        return math.Sqrt(math.Pow(tx-ox, 2) + math.Pow(ty-oy, 2))
    }
    return fn
}
```

### M2.2.2: Variadic and Defered

Variable Argument Number:

```go
func getMax(vals ...int) int {
    maxV := -1
    for _, v := range vals {
        if v > maxV {
            maxV = v
        }
    }
    return maxV
}
```

Variadic Slice Argument:

```go
func main() {
    fmt.Println(getMax(1, 3, 6, 4))
    sli := []int{1, 3, 6, 4}
    fmt.Println(getMax(sli...))
}
```

Deferred Function Calls:

Call can be deferred until the surrounding function completes. It is typically used for cleanup activities.

```go
func main() {
    defer fmt.Println("Bye")
    fmt.Println("Hello")
    
    i := 1
    defer fmt.Println(i)  // the arguments are evaluated right there at once, in this case, i = 1
    i++
    fmt.Println(i) // 2
}
```

## Module 3: Object Orientation in Go

### M3.1.1: Classes and Encapsulation

### M3.1.2: Support for Classes (1)

Associating Methods with Data:

```go
type MyInt int

func (m MyInt) Double() int {  // (m MyInt) is the receiver type
    return int(m*2)
}

func main() {
    v := MyInt(3)
    fmt.Println(v.Double())  // 6 (v is copied to the Double function)
}
```

### M3.1.3: Support for Classes (2)

Struct types compose data fields with methods.

```go
type Point struct {
    x float64
    y float64
}

func (p Point) DistToOrig() {
    t := math.Pow(p.x, 2) + math.Pow(p.y, 2)
    return math.Sqrt(t)
}

func main() {
    p1 := Point(3, 4)
    fmt.Println(p1.DistToOrig())
}
```

### M3.2.1: Encapsulation

Encapsulation is for Controlling Access.

```go
package data
var x int = 1
// define public functions to allow access to hidden data
func getX() {return x}
```

```go
package main
import "data"
func main() {
    fmt.Println(data.getX())
}
```

Controlling Access to Structs

```go
package lib

type Point struct {
    x float64
    y float64
}

func (p *Point) Init(x, y float64) {
    p.x = x
    p.y = y
}
```

```go
package main

import (
    "fmt"
    "lib"
)

func main() {
    var p1 lib.Point
    p1.Init(1, 2)
    fmt.Println(p1)
}
```

### M3.2.2: Point Receivers

```go
package lib

type Point struct {
    x float64
    y float64
}

func (p *Point) OffsetX(x float64) {
    p.x += x
}
```

### M3.2.3: Point Receivers, Referencing, Dereferencing

Using Pointer Receivers:
- All methods for a type have pointer receivers
**or**
- All methods for a type have non-pointer receivers

Mixing pointer/non-pointer receivers for a type will get confusing.

## Module 4: Interfaces for Abstraction

### M4.1.1: Polymorphism

- **Identical** at a high level of abstraction
- **Different** at a low level of abstraction

### M4.1.2: Interfaces

Interface are sets of methods signatures:
- Name, parameters, return values
- Implementation is **not** defined

Interfaces are used to express conceptual similarity between types.

```go
type Shape2D interface {
    Area() float64
    Perimeter() float64
}
type Triangle {...}
// Triangle type satisfies the Shape2D interface
func (t Triangle) Area() float64 {...}
func (t Triangle) Perimeter() float64 {...}
```

### M4.1.3: Interface vs. Concrete Types

Defining an Interface type:

```go
type Speaker interface {
    Speak()
}
type Dog struct {name string}
func (d Dog) Speak() {
    fmt.Println(d.name)
}

func main() {
    var s1 Speaker
    var d1 = Dog("Brian")
    s1 = d1
    s1.Speak()  // Brian
}
```

Nil Dynamic Value:
- Can still call the Speak() method of s1
- Doesn't need a dynamic value to call
- Need to **check inside the method**

```go
func (d Dog) Speak() {
    if d == nil {
        fmt.Println('<noise>')
    } else {
        fmt.Println(d.name)
    }
}

func main() {
    var s1 Speaker
    var d1 *Dog  // d1 is a pointer to type Dog
    s1 = d1  // now s1 has the dynamic type but doesn't have the dynamic value which is nil
    s1.Speak()  // <noise>
}
```

Nil Interface Value:
- Interface with **nil dynamic type**
- Cannot call a method, runtime error

```go
var s1 Speaker  // nil dynamic type
s1.Speak()  // runtime error!!
```

### M4.2.1: Using Interfaces

```go
type Shape2D interface {
    Area() float64
    Perimeter() float64
}
type Triangle {...}
func (t Triangle) Area() float64 {...}
func (t Triangle) Perimeter() float64 {...}
type Rectangle {...}
func (t Rectangle) Area() float64 {...}
func (t Rectangle) Perimeter() float64 {...}

func FitInYard(s Shape2D) bool {
    if s.Area() > 100 && s.Perimeter() > 40 {
        return true
    }
    return false
}
```

Empty Interface:
- Specifies no methods
- All types satisfy the empty interface

```go
func print(val interface{}) {
    fmt.Println(val)
}
```

### M4.2.2: Type Assertions

Exposing Type Differences:

```go
func DrawShape(s Shape2D) {
    rect, ok := s.(Rectangle)
    if ok {
        DrawRect(rect)
    }
    tri, ok := s.(Triangle)
    if ok {
        DrawTriangle(tri)
    }
}
```

Type Switch:

```go
func DrawShape(s Shape2D) {
    switch sh := s.(type) {
        case Rectangle:
            DrawRectangle(sh)
        case Triangle:
            DrawTriangle(sh)
    }
}
```

### M4.2.3: Error Handling

Error Interface:

```go
type error interface {
    Error()
}
```

Handling Errors:

```go
f, err := os.Open("test.txt")
if err != nil {
    fmt.Println(err)
}
```

# Concurrency in Go

## Module 1: Why Use Concurrency?

### M1.1.1: Parallel Execution

Parallel Execution: 2 programs execute in parallel (at exactly the same time).

### M1.1.2: Von Neumann Bottleneck

The von Neumann bottleneck is the idea that computer system throughput is limited due to the relative ability of processors compared to top rates of data transfer. According to this description of computer architecture, a processor is idle for a certain amount of time while memory is accessed.

### M1.1.3: Power Wall

- Transistors consume power when they switch
- Increasing transistor density leads to increased power consumption
- High power leads to high temperature
- Air cooling (fans) can only remove so much heat

### M1.2.1: Concurrent vs Parallel

![Concurrent vs Parallel](https://techdifferences.com/wp-content/uploads/2017/12/Untitled.jpg)

Concurrent: start and end time overlap. Concurrent tasks may be executed on the same hardware.

Parallel: execute at exactly the same time. Parallel tasks must be executed on different hardware.

## Module 2: Concurrency Basics

### M2.1.1: Processes

Process is an instance of a running program. Things unique to a process:
- Memory
- Registers

Processes are running concurrently.

### M2.1.2: Scheduling

Process Scheduling: every process has a turn to be executed.

Context Switching: Control flow changes from one process to another.

### M2.1.3: Threads and Goroutines

![Thread vs Process](https://www.cs.uic.edu/~jbell/CourseNotes/OperatingSystems/images/Chapter4/4_01_ThreadDiagram.jpg)

Threads vs. Processes:
- Threads share some context
- Many threads can exist in one process

![Goroutine](https://miro.medium.com/max/1166/1*ntxTfMNaxclAE7AJgBuAtw.png)

**Goroutines**:
- Like a thread in Go
- Many Goroutines execute within a single OS thread

Go Runtime Scheduler:
- Schedules goroutines inside an OS thread
- Likke a little OS insode a single OS thread

### M2.2.1: Interleavings

![Interleaving](https://3starlearningexperiences.files.wordpress.com/2018/09/interleaving-5.png?w=620)

### M2.2.2: Race Conditions

Outcome depends on non-deterministic ordering.

![Race Condition](https://www.gatevidyalay.com/wp-content/uploads/2018/11/Process-Synchronization-Illustration.png)

Communication Between Tasks:
- Threads are largely independent but not completely independent

## Module 3: Threads in Go

### M3.1.1: Goroutines

Creating a Goroutine:
- One goroutine is created automatically to execute the **main()**
- Other goroutines are created using the **go** keyword

```go
func main() {
    a := 1
    go foo()  // main goroutine does not block on call to foo()
    a = 2
}
```

### M3.1.2: Exiting Goroutines

Exiting a Goroutine:
- A goroutine exits when its code is complete
- When the main goroutine is completed, all other goroutines exit
- A goroutine may not complete its executino because main completes early

Early Exit:

```go
func main() {
    go fmt.Printf("New routine")
    fmt.Printf("Main routine")  // only "Main routine" is printed
}
```

Delayed Exit:

```go
func main() {
    go fmt.Printf("New routine")  // "New routine" is also printed
    time.Sleep(100 * time.Millisecond)
    fmt.Printf("Main routine")  // "Main routine" is printed
}
```

Timing with Goroutines:
- Adding a delay to wait for a goroutine is **bad**
- Timing assumptions may be wrong
- Timing is not nondeterministic
- Need formal synchronization constructs

### M3.2.1: Basic Synchronization

Synchronization:
- Using global events whose execution os viewed by all threads simultaneously
- Global event is viewed by all tasks at the same time
- Is used to restrict bad interleavings

### M3.2.2: Wait Groups

Sync Package:
- Contains functions to synchronize between goroutines
- **sync.WaitGroup** forces a goroutine to wait for other goroutines

```go
import (
    "fmt"
    "sync"
)

func foo(wg *sync.WaitGroup) {
    fmt.Println("foo")
    wg.Done()  // decrements the counter
}

func main() {
    var wg sync.WaitGroup
    wg.Add(1)  // increments the counter
    go foo(&wg)
    wg.Wait()  // blocks until counter == 0
    fmt.Println("main")
}
```

### M3.3.1: Communication

Channels:
- Transfer data between goroutines
- Channels are typed
- Use **make()** to create a channel: **c := make(chan int)**
- Send data on a channel: **c <- 3**
- Receive data from a channel: **x := <- c**

```go
func prod(v1 int, v2 int, c chan int) {
    c <- v1 * v2
}

func main() {
    c := make(chan int)
    go prod(1, 2, c)
    go prod(3, 4, c)
    a := <- c
    b := <- c
    go prod(a, b, c)
    res := <- c
    fmt.Println(res)
}
```

### M3.3.2: Blocking in Channels

Blocking and Synchronization:
- Channel communication is synchronous
- Blocking is the same as waiting for communication
- Receiving and ignoring the result is same as a **Wait()**

### M3.3.3: Buffered Channels

Channel Capacity:
- Channels can contain a limited number of objects
- **Capacity** is the number of objects it can hold in transit
- Optional argument to make() defines channel capacity: **c := make(chan int, 3)**
- Sending only blocks if **buffer is full**
- Receiving only blocks if **buffer is empty**

Use of Buffering:
- Producer and Consumer do not need to operate at exactly the same speed
- Speed mismatch is acceptable

## Module 4: Synchronized Communication

### M4.1.1: Blocking on Channels

Iterating Through a Channel:

```go
for i := range c {
    fmt.Println(i)
}
```

One iteration each time a new value is received. Iterates when sender calls **close(c)**.

Receiving from Multiple Goroutines:
- Multiple channels may be used to receive from multiple sources
- May have a choice of which data to use

```go
select {
    case a = <- c1:
        fmt.Println(a)
    case b = <- c2:
        fmt.Println(b)
}
```

### M4.1.2: Select

Select Send or Receive:

```go
select {
    case a = <- c1:
        fmt.Println("Received a")
    case c2 <- b:
        fmt.Println("Sent b")
}
```

Select with an Abort Channel:
- Use select with a separate abort channel
- May want to receive data until an abort signal is received

```go
select {
    case a = <- c:
        fmt.Println("Received a")
    case <- abort:
        return
}
```

Default Select:

```go
select {
    case a = <- c1:
        fmt.Println(a)
    case b = <- c2:
        fmt.Println(b)
    default:
        fmt.Println("nop")
}
```

### M4.2.1: Mutual Exclusion

```go
var i int
var wg sync.WaitGroup

func inc() {
    i = i + 1
    wg.Done()
}

func main() {
    wg.Add(10000)
    for x := 0; x < 10000; x++ {
        go inc()
    }
    wg.Wait()
    fmt.Println(i)  // may get 9352 or 9468 or ...
}
```

Granularity of Concurrency:
- Concurrency is at the **machine code level**

### M4.2.2: Mutex

![Mutex](https://miro.medium.com/max/1204/1*8oZNWNSthQCcYrjAXxW2UA.png)

Sync.Mutex:
- A Mutex ensures mutual exclusion
- Uses a binary semaphore
- Flag up - share variable is in use
- Flag down - shared variable is available

### M4.2.3: Mutex Methods

```go
var i int
var wg sync.WaitGroup
var mut sync.Mutex

func inc() {
    mut.Lock()
    i = i + 1
    mut.Unlock()
    wg.Done()
}

func main() {
    wg.Add(10000)
    for x := 0; x < 10000; x++ {
        go inc()
    }
    wg.Wait()
    fmt.Println(i)  // this time it gets 10000
}
```

### M4.3.1: Once Synchronization

Sync.Once:
- Has one method, once.Do(f)
- Function f is executed **only one time**
- All calls to **once.Do()** block until the first returns

```go
var on sync.Once
var wg sync.WaitGroup

func setup() {
    fmt.Println("Init")
}

func dostuff() {
    on.Do(setup)
    fmt.Println("hello")
    wg.Done()
}

func main() {
    wg.Add(2)
    go dostuff()
    go dostuff()
    wg.Wait()
    fmt.Println("main")
}

/*output:
Init
hello
hello
main
*/
```

### M4.3.2: Deadlock

![Deadlock](https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Process_deadlock.svg/1200px-Process_deadlock.svg.png)

Circular dependencies cause all involved goroutines to block.

```go
func dostuff(c1 chan int, c2 chan int) {
    <- c1
    c2 <- 1
    wg.Done()
}

func main() {
    ch1 := make(chan int)
    ch2 := make(chan int)
    wg.Add(2)
    go dostuff(ch1, ch2)
    go dostuff(ch2, ch1)
    wg.Wait()
}
```

Deadlock Detection: Golang runtime automatically detects when all goroutines are deadlocked.

### M4.3.3: Dining Philosophers

![Dining Philosephers](https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/An_illustration_of_the_dining_philosophers_problem.png/220px-An_illustration_of_the_dining_philosophers_problem.png)

- Each chopstick is a mutex
- Each philosepher is associated with a goroutine and two chopsticks

```go
type Chops struct {sync.Mutex}
type Philo struct {
    leftCS, rightCS *Chops
}

var wg sync.WaitGroup

func (p Philo) eat() {
    for {
        p.leftCS.Lock()
        p.rightCS.Lock()
        fmt.Println("eating")
        p.leftCS.Unlock()
        p.rightCS.Unlock()
    }
    wg.Done()
}

func main() {
    CSticks := make([]*Chops, 5)
    for i := 0; i < 5; i++ {
        CSticks[i] = new(Chops)
    }
    philos := make([]*Philo, 5)
    for i := 0; i < 5; i++ {
        philos[i] = &Philo{CSticks[i], CSticks[(i+1)%5]}
    }
    wg.Add(5)
    for i := 0; i < 5; i++ {
        go philos[i].eat()
    }
    wg.Done()
}

// fatal error: all goroutines are asleep - deadlock!
```